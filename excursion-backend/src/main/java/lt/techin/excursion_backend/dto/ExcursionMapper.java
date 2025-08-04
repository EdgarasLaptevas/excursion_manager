package lt.techin.excursion_backend.dto;

import lt.techin.excursion_backend.model.Excursion;

public class ExcursionMapper {

    public static Excursion toEntity(ExcursionRequestDTO excursionRequestDTO) {
        Excursion excursion = new Excursion();
        excursion.setExcursionName(excursionRequestDTO.excursionName());
        excursion.setDescription(excursionRequestDTO.description());
        excursion.setPhotoUrl(excursionRequestDTO.photoUrl());
        excursion.setDuration(excursionRequestDTO.duration());
        excursion.setPrice(excursionRequestDTO.price());
        excursion.setReview(excursionRequestDTO.review());

        return excursion;
    }

    public static ExcursionResponseDTO toDTO(Excursion excursion) {
        ExcursionResponseDTO excursionResponseDTO = new ExcursionResponseDTO(excursion.getExcursionId(), excursion.getExcursionName(), excursion.getDescription(), excursion.getPhotoUrl(), excursion.getDuration(), excursion.getPrice(), excursion.getReview());

        return excursionResponseDTO;
    }
}
