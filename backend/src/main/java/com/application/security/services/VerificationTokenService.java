package com.application.security.services;


import com.application.security.dto.Response;
import com.application.security.entity.User;
import com.application.security.entity.VerificationToken;
import org.springframework.http.ResponseEntity;

public interface VerificationTokenService {
   void saveUserVerificationToken(User user, String token);
   String validateToken(String token);
   ResponseEntity<Response> verifyEmail(String token);
   VerificationToken generateNewVerificationToken(String oldToken);
}
