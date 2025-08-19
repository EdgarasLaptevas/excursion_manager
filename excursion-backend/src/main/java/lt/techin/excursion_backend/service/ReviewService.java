package lt.techin.excursion_backend.service;

import lt.techin.excursion_backend.model.Review;
import lt.techin.excursion_backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review addReview(Review review) {

        reviewRepository.save(review);
        return review;
    }

    public void deleteReview(long reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
