package lt.techin.excursion_backend.controller.excursion;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.techin.excursion_backend.dto.ExcursionDTO;
import lt.techin.excursion_backend.dto.ExcursionDateDTO;
import lt.techin.excursion_backend.model.Category;
import lt.techin.excursion_backend.model.Excursion;
import lt.techin.excursion_backend.repository.CategoryRepository;
import lt.techin.excursion_backend.repository.ExcursionRepository;

@RestController
@RequestMapping("/api/excursions")
public class ExcursionController {

    private final ExcursionRepository excursionRepository;
    private final CategoryRepository categoryRepository;

    public ExcursionController(ExcursionRepository excursionRepository, CategoryRepository categoryRepository) {
        this.excursionRepository = excursionRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Excursion> getExcursion(@PathVariable Integer id) {
        return excursionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<ExcursionDTO> getAllExcursions() {
        return excursionRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> createExcursion(@RequestBody Excursion excursion) {
        // Title check
        if (excursion.getTitle() == null || excursion.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Title is required"));
        }

        // Category check
        Integer categoryId = excursion.getCategory() != null ? excursion.getCategory().getId() : null;
        if (categoryId == null || !categoryRepository.existsById(categoryId)) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "Category with ID " + categoryId + " does not exist."));

        }

        Category category = categoryRepository.findById(categoryId).orElseThrow();
        excursion.setCategory(category);

        Excursion saved = excursionRepository.save(excursion);
        return ResponseEntity.ok(saved);
        // return excursionRepository.save(excursion);
    }

    private ExcursionDTO toDto(Excursion excursion) {
        String categoryName = excursion.getCategory() != null
                ? excursion.getCategory().getName()
                : null;

        List<ExcursionDateDTO> dateDTOs = excursion.getDatesList() != null
            ? excursion.getDatesList().stream()
                .map(date -> new ExcursionDateDTO(date.getExcursionTime().toLocalDateTime()))
                .collect(Collectors.toList())
            : new ArrayList<>();

        return new ExcursionDTO(
                excursion.getId(),
                excursion.getTitle(),
                excursion.getPhoto_url(),
                excursion.getDuration(),
                excursion.getPrice(),
                categoryName,
                dateDTOs);
    }
}
