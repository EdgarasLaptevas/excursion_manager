package lt.techin.excursion_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record LoginRequestDTO(@NotNull(message = "You must provide an email")
                             @Size(min = 8, max = 255, message = "Email must be between 8 and 255 characters")
                             @Email(message = "Invalid email format")
                             String email,

                             @NotNull(message = "You must provide a password")
                             @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters")
//                             @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}|\\[\\]:\";'<>?,./]).+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
//                                     message = "Invalid password format or missing character requirements")
                             String password) {
}
