package com.application.security.auth;

import com.application.security.configSecurity.LogoutService;
import com.application.security.dto.Response;
import com.application.security.entity.User;
import com.application.security.listener.RegistrationCompleteEventListener;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;
  private final HttpServletRequest servletRequest;
  private final RegistrationCompleteEventListener eventListener;
  private final LogoutService logoutService;


  @PostMapping("/register")
  public ResponseEntity<Response> register( @RequestBody @Valid RegisterRequest userRequest,
                                            HttpServletRequest request) {
    ///AuthenticationResponse response = service.register(request);
    //if (request.isMfaEnabled()) {
    //  return ResponseEntity.ok(response);
   // } else {
    //  return ResponseEntity.accepted().build();
   // }
    return service.register(userRequest,request);
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
          @RequestBody AuthenticationRequest request) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response) throws IOException {
    service.refreshToken(request, response);
  }

  // method that allow us to verify the code
  @PostMapping("/verify")
  public ResponseEntity<?> verifyCode(
          @RequestBody VerificationRequest verificationRequest) {
    return ResponseEntity.ok(service.verifyCode(verificationRequest));
  }

  public String applicationUrl(HttpServletRequest request) {
    return "http://" + request.getServerName() + ":"
            + request.getServerPort() + request.getContextPath();
  }



  private String passwordResetEmailLink(User user, String applicationUrl,
                                        String passwordToken) throws MessagingException, UnsupportedEncodingException {
    String code = "votre code est : " + passwordToken;
    eventListener.sendPasswordResetVerificationEmail(code, user);
    /// log.info("Click the link to reset your password : {}", url);
    return code;
  }



  @PostMapping("/logout")
  public ResponseEntity<String> logout(HttpServletRequest request, Authentication authentication) {
    try {
      // Clear authentication context
      SecurityContextHolder.clearContext();
      return ResponseEntity.ok("Logout successful");
    } catch (Exception e) {
      return ResponseEntity.status( HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed");
    }
  }
}