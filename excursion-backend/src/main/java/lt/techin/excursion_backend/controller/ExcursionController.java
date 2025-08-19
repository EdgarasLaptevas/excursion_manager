package lt.techin.excursion_backend.controller.auth;


import jakarta.validation.Valid;
import lt.techin.excursion_backend.controller.BaseController;
import lt.techin.excursion_backend.dto.*;
import lt.techin.excursion_backend.model.Excursion;
import lt.techin.excursion_backend.service.ExcursionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/")
public class ExcursionController extends BaseController {
    private final ExcursionService excursionService;
    public final ExcursionMapper excursionMapper;

    public ExcursionController(ExcursionService excursionService, ExcursionMapper excursionMapper) {
        this.excursionService = excursionService;
        this.excursionMapper = excursionMapper;
    }

    @PostMapping("/excursions")
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
        ExcursionListResponseDTO excursionListResponseDTO = excursionMapper.toListResponseDto(excursions);

        return ok(excursionListResponseDTO, excursions.isEmpty() ? "Reviews List is empty" : null);
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

    @PutMapping("/excursion/{excursionId}")
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<ExcursionResponseDTO>> excursionUpdate(@PathVariable long excursionId, @Valid @RequestBody ExcursionRequestDTO excursionRequestDTO) {
       // excursionService.updateExcursion(excursionId, excursionRequestDTO);

        Excursion updatedExcursion = excursionService.updateExcursion(excursionId, excursionRequestDTO);
        ExcursionResponseDTO excursionResponseDTO = excursionMapper.toDTO(updatedExcursion);

        return ok(excursionResponseDTO, "Review updated successfully");
    }

}