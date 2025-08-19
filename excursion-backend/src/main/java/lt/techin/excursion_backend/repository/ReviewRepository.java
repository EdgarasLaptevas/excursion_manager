package lt.techin.excursion_backend.repository;

import lt.techin.excursion_backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
