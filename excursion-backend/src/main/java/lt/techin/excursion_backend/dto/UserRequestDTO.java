package lt.techin.excursion_backend.dto;

import jakarta.validation.constraints.*;

public record UserRequestDTO(@NotNull(message = "You must provide an email")
                             @Size(min = 4, max = 255, message = "Email must be between 4 and 255 characters")
                             @Email(message = "Invalid email format")
                             String email,

                             @NotNull(message = "You must provide a password")
                             @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters")
                             @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).+$",
                                     message = "Invalid password format or missing character requirements")
                             String password) {
}
