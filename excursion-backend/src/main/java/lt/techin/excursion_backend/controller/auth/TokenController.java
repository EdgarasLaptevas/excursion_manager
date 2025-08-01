package lt.techin.excursion_backend.controller.auth;

import jakarta.validation.Valid;
import lt.techin.excursion_backend.controller.BaseController;
import lt.techin.excursion_backend.dto.ApiResponse;
import lt.techin.excursion_backend.dto.LoginRequestDTO;
import lt.techin.excursion_backend.exception.ApiErrorException;
import lt.techin.excursion_backend.model.User;
import lt.techin.excursion_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class TokenController extends BaseController {
    private final JwtEncoder jwtEncoder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public TokenController(JwtEncoder jwtEncoder, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jwtEncoder = jwtEncoder;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_CLIENT', 'SCOPE_ROLE_ADMIN')")
    @PostMapping("/auth/token")
    public ResponseEntity<ApiResponse<String>> token(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        Instant now = Instant.now();
        long expiry = 36000L;

        String email = loginRequestDTO.email();
        String password = loginRequestDTO.password();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Account not found"));


        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new ApiErrorException("Invalid Password", HttpStatus.BAD_REQUEST);
        }

        String scope = user.getRoles().stream().map((role) -> role.getName().toUpperCase()).collect(Collectors.joining(" "));

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(email)
                .claim("user_ic", user.getUserId())
                .claim("scope", scope)
                .build();

        String token = jwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();

        return ok(token, "Login successful");

    }
}
