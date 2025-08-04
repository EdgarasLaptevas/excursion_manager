package lt.techin.excursion_backend.dto;

public record ExcursionResponseDTO(
        long excursionId, String
excursionName,
        String description, String
        photoUrl,
        long duration, double price, String
        review
) {
}