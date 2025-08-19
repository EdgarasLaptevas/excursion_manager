package lt.techin.excursion_backend.controller;


import jakarta.validation.Valid;
import lt.techin.excursion_backend.dto.*;
import lt.techin.excursion_backend.model.Excursion;
import lt.techin.excursion_backend.service.ExcursionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExcursionController extends BaseController {
    private final ExcursionService excursionService;

    public ExcursionController(ExcursionService excursionService) {
        this.excursionService = excursionService;
    }

    @PostMapping("/excursions")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?> addExcursion(@Valid @RequestBody ExcursionRequestDTO excursionRequestDTO) {
        if (excursionService.excursionExistsByExcursionName(excursionRequestDTO.excursionName())) {
            return badRequest(null, "Excursion already exists with such name");
        }

        Excursion excursion = ExcursionMapper.toEntity(excursionRequestDTO);
        ExcursionResponseDTO responseDTO = ExcursionMapper.toDTO(excursionService.addExcursion(excursion));
        return created(responseDTO, "Excursion created successfully.");
    }


    @GetMapping("/excursions")
    public ResponseEntity<ApiResponse<ExcursionListResponseDTO>> getAllExcursions() {
        List<Excursion> excursions = excursionService.findAllExcursions();
        ExcursionListResponseDTO excursionListResponseDTO = ExcursionMapper.toListResponseDto(excursions);

        return ok(excursionListResponseDTO, excursions.isEmpty() ? "Excursions List is empty" : null);
    }


//    @DeleteMapping("/auth/excursion/{excursionId}")
//    public void deleteExcursion(@PathVariable long excursionId) {
//        excursionService.deleteExcursion(excursionId);
//    }

    @DeleteMapping("/excursions/{excursionId}")
    public ResponseEntity<ApiResponse<Void>> deleteExcursion(@PathVariable long excursionId) {
        excursionService.deleteExcursion(excursionId);

        return ok(null, "Excursion deleted successfully");
    }

    @PutMapping("/excursions/{excursionId}")
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<ExcursionResponseDTO>> excursionUpdate(@PathVariable long excursionId, @Valid @RequestBody ExcursionRequestDTO excursionRequestDTO) {
       // excursionService.updateExcursion(excursionId, excursionRequestDTO);

        Excursion updatedExcursion = excursionService.updateExcursion(excursionId, excursionRequestDTO);
        ExcursionResponseDTO excursionResponseDTO = ExcursionMapper.toDTO(updatedExcursion);

        return ok(excursionResponseDTO, "Excursion updated successfully");
    }

}