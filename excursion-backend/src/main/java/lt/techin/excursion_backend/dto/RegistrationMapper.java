package lt.techin.excursion_backend.dto;

import lt.techin.excursion_backend.model.Excursion;
import lt.techin.excursion_backend.model.User;
import lt.techin.excursion_backend.model.registration.Registration;

public class RegistrationMapper {

    public static Registration toEntity(Excursion excursion, User user, RegistrationRequestDTO registrationRequestDTO) {
        Registration registration = new Registration();
        registration.setUser(user);
        registration.setExcursion(excursion);
        registration.setStatus(registrationRequestDTO.status());

        return registration;
    }

    public static RegistrationResponseDTO toDTO(Registration registration) {

        return new RegistrationResponseDTO(registration.getRegistrationId(), registration.getUser().getUserId(), registration.getExcursion().getExcursionId(), registration.getStatus());
    }
}
