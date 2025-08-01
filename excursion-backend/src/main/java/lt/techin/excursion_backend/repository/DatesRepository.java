package lt.techin.excursion_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.excursion_backend.model.Dates;

public interface DatesRepository extends JpaRepository<Dates, Integer> {

}
