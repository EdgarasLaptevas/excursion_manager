package lt.techin.excursion_backend.model.registration;

import jakarta.persistence.*;
import lt.techin.excursion_backend.model.Excursion;
import lt.techin.excursion_backend.model.User;

@Entity
@Table(name = "registrations")
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long registrationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "excursion_id", nullable = false)
    private Excursion excursion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RegistrationStatus status;


    public Registration() {
    }

    public Registration(RegistrationStatus status, Excursion excursion, User user) {
        this.status = status;
        this.excursion = excursion;
        this.user = user;
    }

    public long getRegistrationId() {
        return registrationId;
    }

    public User getUser() {
        return user;
    }

    public Excursion getExcursion() {
        return excursion;
    }

    public RegistrationStatus getStatus() {
        return status;
    }

    public void setRegistrationId(long registrationId) {
        this.registrationId = registrationId;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setExcursion(Excursion excursion) {
        this.excursion = excursion;
    }

    public void setStatus(RegistrationStatus status) {
        this.status = status;
    }
}
