package lt.techin.excursion_backend.service;


import jakarta.validation.Valid;
import lt.techin.excursion_backend.dto.ExcursionRequestDTO;
import lt.techin.excursion_backend.dto.ExcursionResponseDTO;
import lt.techin.excursion_backend.model.Excursion;
import lt.techin.excursion_backend.model.User;
import lt.techin.excursion_backend.repository.ExcursionRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ExcursionService {
    private final ExcursionRepository excursionRepository;

    public ExcursionService(ExcursionRepository excursionRepository) {
        this.excursionRepository = excursionRepository;
    }

    public Excursion addExcursion(Excursion excursion) {
        excursionRepository.save(excursion);
        return excursion;
    }

    public void deleteExcursion(long excursionId) {
        excursionRepository.deleteById(excursionId);
    }

    public Optional<Excursion> findExcursionById(long id) {
        return excursionRepository.findById(id);
    }

    public Excursion getExcursionById(Long excursionId) {
        return excursionRepository.findById(excursionId).orElseThrow(() -> new IllegalArgumentException("Excursion not found"));
    }

    public Excursion updateExcursion(long excursionId, @Valid ExcursionRequestDTO excursionRequestDTO) {
        Excursion excursion = excursionRepository.findById(excursionId).orElseThrow(() -> new IllegalAccessError("Excursion was not found"));
        excursion.setExcursionName(excursionRequestDTO.excursionName());
        excursion.setDescription(excursionRequestDTO.description());
        excursion.setPhotoUrl(excursionRequestDTO.photoUrl());
        excursion.setDuration(excursionRequestDTO.duration());
        excursion.setPrice(excursionRequestDTO.price());
        excursion.setReview(excursionRequestDTO.review());

        addExcursion(excursion);

        return excursion;
    }
}
