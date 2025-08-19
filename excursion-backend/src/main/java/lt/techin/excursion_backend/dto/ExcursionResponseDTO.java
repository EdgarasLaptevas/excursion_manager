package lt.techin.excursion_backend.dto;

import java.math.BigDecimal;

public record ExcursionResponseDTO(
        long excursionId, String
excursionName,
        String description, String
        photoUrl,
        long duration, BigDecimal price
) {
}