package lt.techin.excursion_backend.dto;

import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.URL;

public record ExcursionRequestDTO(
        @NotBlank(message = "Excursion name is required")
        @Size(max = 500, message = "Excursion name must be up to 500 characters")
        String excursionName,

        @NotBlank(message = "Description is required")
        @Size(max = 2000, message = "Description must be under 2000 characters")
        String description,

        @NotBlank(message = "Photos url is required")
        @URL
        String photoUrl,

        @NotNull(message = "Duration is required")
        @Positive(message = "Duration must be positive")
        double duration,

        @NotNull(message = "Price is required")
        @Positive(message = "Price must be positive")
        double price,

        @Size(max = 2000, message = "Review must be under 2000 characters")
        String review
) {

}
