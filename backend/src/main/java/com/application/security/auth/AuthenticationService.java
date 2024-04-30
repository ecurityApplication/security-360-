package com.application.security.auth;

import com.application.security.configSecurity.JwtService;
import com.application.security.dto.Response;
import com.application.security.email.EmailSender;
import com.application.security.entity.Role;
import com.application.security.entity.Token;
import com.application.security.entity.TokenType;
import com.application.security.entity.User;
import com.application.security.event.RegistrationCompleteEvent;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.TokenRepository;
import com.application.security.repository.UserRepository;
import com.application.security.services.PasswordResetTokenService;
import com.application.security.services.UserDetailsServiceImpl;
import com.application.security.tfa.TowFactorAuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.application.security.services.ChangePasswordService.applicationUrl;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final TowFactorAuthenticationService tfaService;
  private final PasswordResetTokenService passwordResetTokenService;
  private final RoleRepository roleRepository;

  private final UserDetailsServiceImpl userDetailsService;
  //private final EmailValidator emailValidator;
  private final EmailSender emailSender;
  private final ApplicationEventPublisher publisher;

  public ResponseEntity<Response> register(RegisterRequest userRequest,final HttpServletRequest request) {
    boolean userExists = repository.findAll()
            .stream()
            .anyMatch(user -> userRequest.getEmail().equalsIgnoreCase(user.getEmail()));

    if (userExists) {
      return ResponseEntity.badRequest().body( Response.builder()
              .responseMessage("User with provided email  already exists!")
              .build());
    }

    // add roles to users
    List<String> strRoles = userRequest.getRole();
    List<Role> roles = new ArrayList<>();
    // if (strRoles != null && !strRoles.isEmpty()) {
    //     strRoles.forEach(role -> {
    //         switch (role) {
    //             case "admin":
    //                 Role adminRole = roleRepository.findByRoleName("ROLE_ADMIN")
    //                         .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    //                 roles.add(adminRole);
    //                 break;
    //             case "moderator":
    //                 Role moderatorRole = roleRepository.findByRoleName("ROLE_MODERATOR")
    //                         .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    //                 roles.add(moderatorRole);
    //                 break;
    //             default:
    //                 Role userRole = roleRepository.findByRoleName("ROLE_USER")
    //                         .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    //                 roles.add(userRole);
    //         }
    //     });
    // } else {
    // if any role specified, attribute default role "ROLE_ADMIN"
    Role adminRole = roleRepository.findByRoleName("ROLE_ADMIN")
            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    roles.add(adminRole);
    // }

    // Create a new user entity with the provided details
    var user = User.builder()
            .username(userRequest.getUsername())
            .email(userRequest.getEmail())
            .password(passwordEncoder.encode(userRequest.getPassword()))
            .roles(roles)
            .mfaEnabled(true)
            .build();

    // Generate MFA secret if enabled
    //if (request.isMfaEnabled()) {
      user.setSecret(tfaService.generateNewSecret());
   // }

    // Save the user entity to the database
    var savedUser = repository.save(user);
    publisher.publishEvent(new RegistrationCompleteEvent(savedUser, applicationUrl(request)));

// Enable the previous admin account
//    repository.enablePreviousAdminAccount(savedUser.getId());
    // Generate JWT token and refresh token
   // var jwtToken = jwtService.generateToken(user);
    //var refreshToken = jwtService.generateRefreshToken(user);

    // Save user token (not sure about the implementation of saveUserToken method)
    //saveUserToken(savedUser, jwtToken);

    // Generate QR code image URL
    String qrCodeImageUrl = tfaService.generateQrCodeImgUri(user.getSecret());

    // Send registration details to user's email
    String emailSubject = "Registration Confirmation";
    String emailBody = "<html><body>"
            + "<p>Dear " + userRequest.getUsername() + ",</p>"
            + "<p>Thank you for registering with us!</p>"
            + "<p>Your registration details:</p>"
            + "<ul>"
            + "<li>Username: " + userRequest.getUsername() + "</li>"
            + "<li>Email: " + userRequest.getEmail() + "</li>"
            + "<li>MFA Enabled: " + userRequest.isMfaEnabled() + "</li>"
            + "</ul>"
            + "<p>Please keep this information secure.</p>"
            + "<p>Best regards,<br/>The Team</p>"
            + "<img src=\"data:image/png;base64," + qrCodeImageUrl + "\">"
            + "</body></html>";

    emailSender.send(user.getEmail(), emailSubject, emailBody, qrCodeImageUrl);

    // Return authentication response with tokens and MFA details
    return new ResponseEntity<>(
            Response.builder()

                    .responseMessage("Success! Please, check your email to complete your registration")
                    .email(savedUser.getEmail())
                    .secretImageUri(qrCodeImageUrl)
                    .mfaEnabled(true)
                    .build(),
            HttpStatus.CREATED
    );
  }


  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    // Perform authentication using email and password
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );
    // Set the authentication object in the security context
    SecurityContextHolder.getContext().setAuthentication( authentication );
    // Retrieve the authenticated user from the repository
    var user = repository.findByEmail( request.getEmail() )
            .orElseThrow();

    // Check if user has admin role (improved)
   // if (user.getRoles().stream().anyMatch( role -> role.getRoleName().equals( "ROLE_ADMIN" )  )) {

      // Admin with MFA enabled?
      //if the user enable the mFA
     // if (user.isMfaEnabled()) {
       // return AuthenticationResponse.builder()
              //  .accessToken( "" )
               // .refreshToken( "" )
               // .mfaEnabled( true )
               // .role(user.getRoles().stream().map(Role::getRoleName).collect(Collectors.toList()))
               // .build();
     // }
    //}
    // Generate JWT token and refresh token
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    // Revoke all existing user tokens
    revokeAllUserTokens(user);//token
    // Save user token
    saveUserToken(user, jwtToken);
    // Return authentication response with tokens, roles, and MFA details
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .role(user.getRoles().stream()
                    .map(Role::getRoleName)
                    .collect(Collectors.toList()))
            //mfa Enabled
            //.mfaEnabled(false)
            .mfaEnabled(true)
            .build();
    // Helper method to get role names as a comma-separated string
  }



  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType( TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;//if the table of token is empty it will return
    validUserTokens.forEach(token -> {
      token.setExpired(true);//will modify the values
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                //mfa Enabled
                .mfaEnabled(false)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }

  public AuthenticationResponse verifyCode(VerificationRequest verificationRequest) {
    System.out.println("enetr verify");
    User user = repository
            .findByEmail(verificationRequest.getEmail())
            .orElseThrow(() -> new EntityNotFoundException(
                    String.format("No user found with %S",verificationRequest.getEmail()))
            );
    if(tfaService.isOtpNotValid( user.getSecret(), verificationRequest.getCode())) {
      throw new BadCredentialsException("Code is not correct");
    }
    var jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .mfaEnabled(user
                    .isMfaEnabled())
            .build();
  }





  public boolean oldPasswordIsValid(User user, String oldPassword){
    return passwordEncoder.matches(oldPassword, user.getPassword());
  }

  public Optional<User> findByEmail(String email) {
    return repository.findByEmail(email);
  }



  public void changePassword(User theUser, String newPassword) {
    theUser.setPassword(passwordEncoder.encode(newPassword));
    repository.save(theUser);
  }
}