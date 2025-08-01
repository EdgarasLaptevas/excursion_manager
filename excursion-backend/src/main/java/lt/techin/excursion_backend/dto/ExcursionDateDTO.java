package lt.techin.excursion_backend.dto;

import java.time.LocalDateTime;

public class ExcursionDateDTO {
    private LocalDateTime excursionTime;

    public ExcursionDateDTO() {
    }

    public ExcursionDateDTO(LocalDateTime excursionTime) {
        this.excursionTime = excursionTime;
    }

    public LocalDateTime getExcursionTime() {
        return excursionTime;
    }

    public void setExcursionTime(LocalDateTime excursionTime) {
        this.excursionTime = excursionTime;
    }
}
