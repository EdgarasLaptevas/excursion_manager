package lt.techin.excursion_backend.dto;

import jakarta.validation.constraints.*;

public record UserRequestDTO(@NotBlank(message = "You must provide an email")
                             @Size(min = 8, max = 255, message = "Email must be between 8 and 255 characters")
                             @Email(message = "Invalid email format")
                             String email,

                             @NotBlank(message = "You must provide a password")
                             @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters")
                             @Pattern(regexp = "^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).+$",
                                     message = "Invalid password format or missing character requirements")
                             String password) {
}
