package lt.techin.excursion_backend.service;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lt.techin.excursion_backend.dto.ExcursionRequestDTO;
import lt.techin.excursion_backend.dto.ExcursionResponseDTO;
import lt.techin.excursion_backend.model.Excursion;
import lt.techin.excursion_backend.model.User;
import lt.techin.excursion_backend.repository.ExcursionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Excursion updateExcursion(long excursionId, ExcursionRequestDTO excursionRequestDTO) {
        Excursion excursion = getExcursionById(excursionId);
        excursion.setExcursionName(excursionRequestDTO.excursionName());
        excursion.setDescription(excursionRequestDTO.description());
        excursion.setPhotoUrl(excursionRequestDTO.photoUrl());
        excursion.setDuration(excursionRequestDTO.duration());
        excursion.setPrice(excursionRequestDTO.price());

        addExcursion(excursion);

        return excursion;
    }

    public boolean excursionExistsByExcursionName(String excursionName) {
        return excursionRepository.existsByExcursionName(excursionName);
    }

    public List<Excursion> findAllExcursions() {
        return excursionRepository.findAll();
    }
}
