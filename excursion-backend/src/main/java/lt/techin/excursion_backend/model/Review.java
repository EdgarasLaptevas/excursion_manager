package lt.techin.excursion_backend.model;

import jakarta.persistence.*;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "excursion_id")
    private Excursion excursion;

    private String reviewText;
    private int rating;

    public Review() {
    }

    public Review(User user, Excursion excursion, String reviewText, int rating) {
        this.user = user;
        this.excursion = excursion;
        this.reviewText = reviewText;
        this.rating = rating;
    }

    public long getReviewId() {
        return reviewId;
    }

    public User getUser() {
        return user;
    }

    public Excursion getExcursion() {
        return excursion;
    }

    public String getReviewText() {
        return reviewText;
    }

    public int getRating() {
        return rating;
    }

    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setExcursion(Excursion excursion) {
        this.excursion = excursion;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
