package lt.techin.excursion_backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "excursion")
public class Excursion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long excursionId;

    private String excursionName;
    private String description;
    private String photoUrl;
    private long duration;
    private double price;
    private String review;

    public Excursion() {
    }

    public Excursion(String excursionName, String description, String photoUrl, long duration, double price, String review) {
        this.excursionName = excursionName;
        this.description = description;
        this.photoUrl = photoUrl;
        this.duration = duration;
        this.price = price;
        this.review = review;
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

    public double getDuration() {
        return duration;
    }

    public double getPrice() {
        return price;
    }

    public String getReview() {
        return review;
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

    public void setPrice(double price) {
        this.price = price;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
