package lt.techin.excursion_backend.dto;

public record ReviewResponseDTO(
        long reviewId,
        long userId,
        long excursionId,
        String reviewText,
        Integer rating
) {
}
