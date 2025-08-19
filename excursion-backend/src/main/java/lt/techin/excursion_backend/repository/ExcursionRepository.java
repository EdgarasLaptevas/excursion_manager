package lt.techin.excursion_backend.repository;

import lt.techin.excursion_backend.model.Excursion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExcursionRepository extends JpaRepository<Excursion, Long> {
    boolean existsByExcursionName(String excursionName);
}
