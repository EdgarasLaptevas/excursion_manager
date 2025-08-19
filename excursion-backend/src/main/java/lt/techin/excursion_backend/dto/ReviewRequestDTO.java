package lt.techin.excursion_backend.dto;

import jakarta.validation.constraints.*;

public record ReviewRequestDTO(
        @NotNull(message = "Review text is required")
        @Size(min = 50, max = 2000, message = "Review must be at least 50 characters, but not more than 2000")
        String reviewText,

        @NotNull(message = "Rating is required")
        @Min(value = 1, message = "Rating must be at least 1")
        @Max(value = 10, message = "Rating must not exceed 10")
        Integer rating
) {
}
