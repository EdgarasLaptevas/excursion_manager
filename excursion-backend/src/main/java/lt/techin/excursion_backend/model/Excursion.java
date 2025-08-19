package lt.techin.excursion_backend.model;

import jakarta.persistence.*;
import lt.techin.excursion_backend.model.registration.Registration;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "excursions")
public class Excursion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long excursionId;

    private String excursionName;
    private String description;
    private String photoUrl;
    private long duration;
    private BigDecimal price;


    @OneToMany(mappedBy = "excursion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Registration> registrations = new ArrayList<>();


    public Excursion() {
    }

    public Excursion(String excursionName, String description, String photoUrl, long duration, BigDecimal price) {
        this.excursionName = excursionName;
        this.description = description;
        this.photoUrl = photoUrl;
        this.duration = duration;
        this.price = price;
    }

    public long getExcursionId() {
        return excursionId;
    }

    public String getExcursionName() {
        return excursionName;
    }

    public String getDescription() {
        return description;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public long getDuration() {
        return duration;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public List<Registration> getRegistrations() {
        return registrations;
    }

    public void setExcursionId(long excursionId) {
        this.excursionId = excursionId;
    }

    public void setExcursionName(String excursionName) {
        this.excursionName = excursionName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setRegistrations(List<Registration> registrations) {
        this.registrations = registrations;
    }
}
