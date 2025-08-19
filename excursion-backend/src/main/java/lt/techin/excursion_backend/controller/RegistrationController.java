package lt.techin.excursion_backend.controller;


import jakarta.validation.Valid;
import lt.techin.excursion_backend.dto.RegistrationMapper;
import lt.techin.excursion_backend.dto.RegistrationRequestDTO;
import lt.techin.excursion_backend.dto.RegistrationResponseDTO;
import lt.techin.excursion_backend.exception.ApiErrorException;
import lt.techin.excursion_backend.model.Excursion;
import lt.techin.excursion_backend.model.User;
import lt.techin.excursion_backend.model.registration.Registration;
import lt.techin.excursion_backend.service.ExcursionService;
import lt.techin.excursion_backend.service.RegistrationService;
import lt.techin.excursion_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RegistrationController extends BaseController{
    private final RegistrationService registrationService;
    private final UserService userService;
    private final ExcursionService excursionService;

    @Autowired
    public RegistrationController(RegistrationService registrationService, UserService userService, ExcursionService excursionService) {
        this.registrationService = registrationService;
        this.userService = userService;
        this.excursionService = excursionService;
    }

    @PostMapping("/registrations")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationRequestDTO registrationRequestDTO) {
        long excursionId = registrationRequestDTO.excursionId();
        User user = userService.findUserById(registrationRequestDTO.userId()).orElseThrow(()-> new UsernameNotFoundException("User not found."));
        if (user.getRegistrations().stream().anyMatch(registration -> registration.getExcursion().getExcursionId() == excursionId)) {
            return badRequest(null, "Registration already exists.");
        }

        Excursion excursion = excursionService.findExcursionById(excursionId).orElseThrow(() -> new ApiErrorException("Excursion not found", HttpStatus.NOT_FOUND));
        Registration registration = RegistrationMapper.toEntity(excursion,user, registrationRequestDTO);
        RegistrationResponseDTO responseDTO = RegistrationMapper.toDTO(registrationService.addRegistration(registration));
        return created(responseDTO, "User registered to excursion successfully.");
    }
}
