package com.application.security.auth;

import com.application.security.configSecurity.JwtService;
import com.application.security.email.EmailSender;
import com.application.security.entity.ConfirmationToken;
import com.application.security.entity.Role;
import com.application.security.entity.User;
//import com.application.security.repository.RoleRepository;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.UserRepository;
import com.application.security.services.ConfirmationTokenService;
import com.application.security.services.PasswordResetTokenService;
import com.application.security.services.UserDetailsServiceImpl;
import com.application.security.tfa.TowFactorAuthenticationService;
import com.application.security.token.Token;
import com.application.security.token.TokenRepository;
import com.application.security.token.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


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
  private final EmailValidator emailValidator;
  private final ConfirmationTokenService confirmationTokenService;
  private final EmailSender emailSender;


  public AuthenticationResponse register(RegisterRequest request) {
    // add roles to users
    List<String> strRoles = request.getRole() ;
    List<Role> roles = new ArrayList<>();
    if (strRoles != null && !strRoles.isEmpty()) {
      strRoles.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
            break;
          case "moderator":
            Role managerRole = roleRepository.findByName("ROLE_MODERATOR")
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(managerRole);
            break;
          default:
            Role userRole = roleRepository.findByName("ROLE_USER")
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
      });
    } else {
      // if any role specified, attribute default role "ROLE_USER"
      Role userRole = roleRepository.findByName("ROLE_USER")
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    }
    // Create a new user entity with the provided details
    var user = User.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .roles( roles )
            .mfaEnabled(request.isMfaEnabled())
            .build();

    // Generate MFA secret if enabled
    if (request.isMfaEnabled()) {
      user.setSecret(tfaService.generateNewSecret());
    }

    // Save the user entity to the database
    var savedUser = repository.save(user);
    // Generate JWT token and refresh token
    var jwtToken = jwtService.generateToken(user);
//    var token = Token.builder()
//            .user(savedUser)
//            .token( jwtToken )
//            .tokenType( TokenType.BEARER )
//            .revoked( false )
//            .expired( false )
//            .build();
    //tokenRepository.save( token );
    var refreshToken = jwtService.generateRefreshToken(user);
    // Save user token (not sure about the implementation of saveUserToken method)
    saveUserToken(savedUser, jwtToken);



    // Generate QR code image URL
    String qrCodeImageUrl = tfaService.generateQrCodeImgUri(user.getSecret());

// Send registration details to user's email
    String emailSubject = "Registration Confirmation";
    String emailBody = "<html><body>"
            + "<p>Dear " + user.getUsername() + ",</p>"
            + "<p>Thank you for registering with us!</p>"
            + "<p>Your registration details:</p>"
            + "<ul>"
            + "<li>Username: " + user.getUsername() + "</li>"
            + "<li>Email: " + user.getEmail() + "</li>"
            + "<li>MFA Enabled: " + user.isMfaEnabled() + "</li>"
            + "</ul>"
            + "<p>Please keep this information secure.</p>"
            + "<p>Best regards,<br/>The Team</p>"
            + "<img src=\"data:image/png;base64," + qrCodeImageUrl + "\">"
            + "</body></html>";

    emailSender.send(user.getEmail(), emailSubject, emailBody);
    // Return authentication response with tokens and MFA details
    return AuthenticationResponse.builder()
            //create an imageUri
            .secretImageUri(tfaService.generateQrCodeImgUri(user.getSecret()))
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            //mfa Enabled
            .mfaEnabled(user.isMfaEnabled())
            .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    // Perform authentication using email and password
    Authentication authentication =authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );
    // Set the authentication object in the security context
    SecurityContextHolder.getContext().setAuthentication(authentication);

    // Retrieve the authenticated user from the repository
    var user = repository.findByEmail(request.getEmail())
            .orElseThrow();

    //if the user enable the mFA
    if(user.isMfaEnabled()) {
      return AuthenticationResponse.builder()
              .accessToken("")
              .refreshToken("")
              .mfaEnabled(true)
              .build();
    }
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
            // .role(user.getRole().getName().name())
            .role( user.getRoles().stream()
                    .map(Role::getName)
                    .collect( Collectors.joining(", ")) )
            //mfa Enabled
            .mfaEnabled(false)
            .build();
    // Helper method to get role names as a comma-separated string

  }
  @Transactional
  public String confirmToken(String token) {
    ConfirmationToken confirmationToken = confirmationTokenService
            .getToken(token)
            .orElseThrow(() ->
                    new IllegalStateException("token not found"));

    if (confirmationToken.getConfirmedAt() != null) {
      throw new IllegalStateException("email already confirmed");
    }

    LocalDateTime expiredAt = confirmationToken.getExpiresAt();

    if (expiredAt.isBefore(LocalDateTime.now())) {
      throw new IllegalStateException("token expired");
    }

    confirmationTokenService.setConfirmedAt(token);
    userDetailsService.enableUser(
            confirmationToken.getUser().getEmail());
    return "confirmed";
  }

  private String buildEmail(String name, String link) {
    return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
            "\n" +
            "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
            "\n" +
            "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
            "    <tbody><tr>\n" +
            "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
            "        \n" +
            "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
            "          <tbody><tr>\n" +
            "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
            "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
            "                  <tbody><tr>\n" +
            "                    <td style=\"padding-left:10px\">\n" +
            "                  \n" +
            "                    </td>\n" +
            "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
            "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
            "                    </td>\n" +
            "                  </tr>\n" +
            "                </tbody></table>\n" +
            "              </a>\n" +
            "            </td>\n" +
            "          </tr>\n" +
            "        </tbody></table>\n" +
            "        \n" +
            "      </td>\n" +
            "    </tr>\n" +
            "  </tbody></table>\n" +
            "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
            "    <tbody><tr>\n" +
            "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
            "      <td>\n" +
            "        \n" +
            "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
            "                  <tbody><tr>\n" +
            "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
            "                  </tr>\n" +
            "                </tbody></table>\n" +
            "        \n" +
            "      </td>\n" +
            "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
            "    </tr>\n" +
            "  </tbody></table>\n" +
            "\n" +
            "\n" +
            "\n" +
            "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
            "    <tbody><tr>\n" +
            "      <td height=\"30\"><br></td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
            "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
            "        \n" +
            "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
            "        \n" +
            "      </td>\n" +
            "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "      <td height=\"30\"><br></td>\n" +
            "    </tr>\n" +
            "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
            "\n" +
            "</div></div>";
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
      // System.out.println("incorrect code ");
      throw new BadCredentialsException("Code is not correct");
    }
    var jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .mfaEnabled(user
                    .isMfaEnabled())
            .build();
  }


  public User findUserByPasswordToken(String token) {
    return passwordResetTokenService.findUserByPasswordToken(token).get();
  }


  public void createPasswordResetTokenForUser(User user, String passwordResetToken) {
    passwordResetTokenService.createPasswordResetTokenForUser(user, passwordResetToken);
  }

  public boolean oldPasswordIsValid(User user, String oldPassword){
    return passwordEncoder.matches(oldPassword, user.getPassword());
  }

  public Optional<User> findByEmail(String email) {
    return repository.findByEmail(email);
  }

  public String validatePasswordResetToken(String token) {
    return passwordResetTokenService.validatePasswordResetToken(token);
  }

  public void changePassword(User theUser, String newPassword) {
    theUser.setPassword(passwordEncoder.encode(newPassword));
    repository.save(theUser);
  }

}