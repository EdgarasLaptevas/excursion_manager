package lt.techin.excursion_backend.dto;

import lt.techin.excursion_backend.model.Excursion;
import lt.techin.excursion_backend.model.User;

public record ReviewResponseDTO(
        long reviewId,
        User user,
        Excursion excursion,
        String reviewText,
        Integer rating
) {
}
