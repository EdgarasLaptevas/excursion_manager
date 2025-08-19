package lt.techin.excursion_backend.service;

import jakarta.validation.Valid;
import lt.techin.excursion_backend.dto.RegistrationRequestDTO;
import lt.techin.excursion_backend.model.registration.Registration;
import lt.techin.excursion_backend.repository.RegistrationRepository;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
    private final RegistrationRepository registrationRepository;

    public RegistrationService(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    public Registration createRegistration(Registration registration) {
        registrationRepository.save(registration);
        return registration;
    }

    public Registration addRegistration(Registration registration) {
        registrationRepository.save(registration);
        return registration;
    }
}
