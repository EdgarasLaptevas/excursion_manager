package lt.techin.excursion_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import lt.techin.excursion_backend.model.Excursion;

public interface ExcursionRepository extends JpaRepository<Excursion, Integer>{
    
}
