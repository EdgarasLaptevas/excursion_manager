package lt.techin.excursion_backend.repository;

import lt.techin.excursion_backend.model.registration.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
}
