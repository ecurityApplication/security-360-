package com.application.security.auth;

import com.application.security.configSecurity.JwtService;
import com.application.security.entity.Role;
import com.application.security.entity.User;
import com.application.security.repository.UserRepository;
import com.application.security.services.PasswordResetTokenService;
import com.application.security.tfa.TowFactorAuthenticationService;
import com.application.security.token.Token;
import com.application.security.token.TokenRepository;
import com.application.security.token.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;


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

  public AuthenticationResponse register(RegisterRequest request) {
    var user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            //.role(request.getRole().USER)
//        .role(request.getRole())
            .role( Role.ADMIN)
            .mfaEnabled(request.isMfaEnabled())
            .build();

    // if MFA enabled --> Generate Secret
    if (request.isMfaEnabled()) {
      user.setSecret(tfaService.generateNewSecret());
    }
    var savedUser = repository.save(user);
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
    saveUserToken(savedUser, jwtToken);

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
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );
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
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);//token
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            //mfa Enabled
            .mfaEnabled(false)
            .build();
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
    /*if(tfaService.isOtpNotValid( user.getSecret(), verificationRequest.getCode())) {
      System.out.println("incorrect code ");
      throw new BadCredentialsException("Code is not correct");
    }*/
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