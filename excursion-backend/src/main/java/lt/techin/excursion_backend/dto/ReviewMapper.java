package lt.techin.excursion_backend.dto;

import lt.techin.excursion_backend.model.Review;

public class ReviewMapper {
    public static Review toEntity(ReviewRequestDTO reviewRequestDTO) {
        Review review = new Review();
        //review.setReviewId(review.getReviewId());
        review.setReviewText(reviewRequestDTO.reviewText());
        review.setRating(review.getRating());

        return review;
    }

    public static ReviewResponseDTO toDTO(Review review){
        ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO(review.getReviewId(), review.getUser().getUserId(), review.getExcursion().getExcursionId(), review.getReviewText(), review.getRating());

        return reviewResponseDTO;
    }
}
