package lt.techin.excursion_backend.controller;

import jakarta.validation.Valid;
import lt.techin.excursion_backend.dto.ReviewResponseDTO;
import lt.techin.excursion_backend.model.Review;
import lt.techin.excursion_backend.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ReviewController extends BaseController{
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/reviews")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?>addReview(@Valid @RequestBody ReviewController reviewRequestDTO)

        Review review = ReviewMapper.toEntity(reviewRequestDTO);
        ReviewResponseDTO responseDTO = ReviewMapper.toDTO(reviewService.addReview(review));
        return created(responseDTO, "Review created successfully.")
}
