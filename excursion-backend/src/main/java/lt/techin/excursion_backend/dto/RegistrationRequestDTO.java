package lt.techin.excursion_backend.dto;

import jakarta.validation.constraints.NotNull;
import lt.techin.excursion_backend.model.Excursion;
import lt.techin.excursion_backend.model.User;
import lt.techin.excursion_backend.model.registration.RegistrationStatus;

public record RegistrationRequestDTO(
        @NotNull(message = "User id is required")
        long userId,
        @NotNull(message = "Excursion id is required")
        long excursionId,
        @NotNull(message = "Registration status is required")
        RegistrationStatus status
) {
}
