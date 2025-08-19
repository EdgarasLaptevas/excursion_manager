package lt.techin.excursion_backend.dto;

import lt.techin.excursion_backend.model.registration.RegistrationStatus;

public record RegistrationResponseDTO(
        long registrationId, long userId, long excursionId, RegistrationStatus status
) {
}
