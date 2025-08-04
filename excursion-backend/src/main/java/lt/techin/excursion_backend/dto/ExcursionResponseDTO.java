package lt.techin.excursion_backend.dto;

public record ExcursionResponseDTO(
        long excursionId, String
excursionName,
        String description, String
        photoUrl,
        double duration, double price, String
        review
) {
}