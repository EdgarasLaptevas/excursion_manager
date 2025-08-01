package lt.techin.excursion_backend.model;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Dates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Timestamp excursionTime;
    
    @ManyToOne
    @JoinColumn(name="excursion_id", nullable = false)
    @JsonBackReference
    private Excursion excursion;

    public Dates() {

    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Timestamp getExcursionTime() {
        return excursionTime;
    }
    public void setExcurionTime(Timestamp excursionTime) {
        this.excursionTime = excursionTime;
    }
    public Excursion getExcursion() {
        return excursion;
    }
    public void setExcursion(Excursion excursion) {
        this.excursion = excursion;
    }
}
