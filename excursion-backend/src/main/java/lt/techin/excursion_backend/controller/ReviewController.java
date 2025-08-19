package lt.techin.excursion_backend.controller;

import jakarta.validation.Valid;
import lt.techin.excursion_backend.dto.ApiResponse;
import lt.techin.excursion_backend.dto.ReviewMapper;
import lt.techin.excursion_backend.dto.ReviewRequestDTO;
import lt.techin.excursion_backend.dto.ReviewResponseDTO;
import lt.techin.excursion_backend.model.Review;
import lt.techin.excursion_backend.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ReviewController extends BaseController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/reviews")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?> addReview(@Valid @RequestBody ReviewRequestDTO reviewRequestDTO) {

        Review review = ReviewMapper.toEntity(reviewRequestDTO);
        ReviewResponseDTO responseDTO = ReviewMapper.toDTO(reviewService.addReview(review));
        return created(responseDTO, "Review created successfully.");
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(@PathVariable long reviewId) {
        reviewService.deleteReview(reviewId);

        return ok(null, "Review deleted successfully");
    }
}
