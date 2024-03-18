package com.application.security.auth;
import com.application.security.configSecurity.LogoutService;
import com.application.security.entity.PasswordRequestUtilnewpassword;
import com.application.security.entity.PasswordRequestUtil;
import com.application.security.entity.User;
import com.application.security.listener.RegistrationCompleteEventListener;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;
  private final HttpServletRequest servletRequest;
  private final RegistrationCompleteEventListener eventListener;
  private final LogoutService logoutService;

  @PostMapping("/register")
  public ResponseEntity<?> register(//because the response type might change
                                    @RequestBody RegisterRequest request
  ) {
    //return ResponseEntity.ok(service.register(request));
    var response = service.register( request );
    if (request.isMfaEnabled()) {
      return ResponseEntity.ok( response );
    }
    return ResponseEntity.accepted().build();
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
          @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok( service.authenticate( request ) );
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    service.refreshToken( request, response );
  }

  //method that allow us to verify the code
  @PostMapping("/verify")
  public ResponseEntity<?> verifyCode(
          @RequestBody VerificationRequest verificationRequest
  ) {
    return ResponseEntity.ok( service.verifyCode( verificationRequest ) );
  }

  public String applicationUrl(HttpServletRequest request) {
    return "http://"+request.getServerName()+":"
            +request.getServerPort()+request.getContextPath();
  }

  @PostMapping("/password-reset-request")
  public String resetPasswordRequest(@RequestBody PasswordRequestUtil passwordRequestUtil
  )
          throws MessagingException, UnsupportedEncodingException {

    Optional<User> user = service.findByEmail( passwordRequestUtil.getEmail() );
    String passwordResetUrl = "";
    if (user.isPresent()) {
      String passwordResetToken = UUID.randomUUID().toString();
      service.createPasswordResetTokenForUser( user.get(), passwordResetToken );
      passwordResetUrl = passwordResetEmailLink( user.get(),applicationUrl( servletRequest ), passwordResetToken );
    }
    return passwordResetUrl;
  }


  private String passwordResetEmailLink(User user, String applicationUrl,
                                        String passwordToken) throws MessagingException, UnsupportedEncodingException {
    String code = "votre code est : " + passwordToken;
    eventListener.sendPasswordResetVerificationEmail( code, user );
    /// log.info("Click the link to reset your password :  {}", url);
    return code;
  }

  @PostMapping("/reset-password")
  public String resetPassword(@RequestBody PasswordRequestUtilnewpassword passwordRequestUtil
  ) {
    String tokenVerificationResult = service.validatePasswordResetToken( passwordRequestUtil.getCodeemail() );
    if (!tokenVerificationResult.equalsIgnoreCase( "valid" )) {
      return "Invalid token password reset token";
    }
    Optional<User> theUser = Optional.ofNullable( service.findUserByPasswordToken( passwordRequestUtil.getCodeemail() ) );
    if (theUser.isPresent()) {
      service.changePassword( theUser.get(), passwordRequestUtil.getNewPassword() );
      return "Password has been reset successfully";
    }
    return "Invalid password reset token";
  }
  @PostMapping("/logout")
  public void logout(HttpServletRequest request, HttpServletResponse response) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null) {
      new SecurityContextLogoutHandler().logout(request, response, authentication);
    }
  }
 
}