package lt.techin.excursion_backend.controller.auth;

import jakarta.validation.Valid;
import lt.techin.excursion_backend.dto.UserMapper;
import lt.techin.excursion_backend.dto.UserRequestDTO;
import lt.techin.excursion_backend.dto.UserResponseDTO;
import lt.techin.excursion_backend.model.User;
import lt.techin.excursion_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> addUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        if (userService.userExistsByEmail(userRequestDTO.email())) {
            return ResponseEntity.badRequest().body("User already exists with such email");
        }

        User user = UserMapper.toEntity(userRequestDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        UserResponseDTO responseDTO = UserMapper.toDTO(userService.saveUser(user));

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }


}
