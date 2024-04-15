package com.application.security.controller;

import com.application.security.dto.ChangePasswordResetRequest;
import com.application.security.services.PasswordResetTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
    @RequestMapping("/api/v1/forget")
@RequiredArgsConstructor
public class PasswordResetTokenController {

    private final PasswordResetTokenService passwordResetTokenService;
    //send mail for email verification
    @PostMapping("/resetrequestpassword/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email){

        return passwordResetTokenService.verifyEmail(email);

    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp,@PathVariable String email){
        return passwordResetTokenService.verifyOtp(otp, email);
    }

    //Now User Can change the password

    @PostMapping("/resetPassword/{email}")
    public ResponseEntity<String> changePasswordHandler(
            @RequestBody ChangePasswordResetRequest changePassword,
            @PathVariable String email
    ){
        return passwordResetTokenService.changePasswordHandler(changePassword,email);
    }
}
