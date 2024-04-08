package com.application.security.demoController;

import com.application.security.services.ChangePasswordRequest;
import com.application.security.services.ChangePasswordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;

public class ChangePasswordController {
    private final ChangePasswordService changePassword;

    public ChangePasswordController(ChangePasswordService changePassword) {
        this.changePassword = changePassword;
    }

    @PatchMapping
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        changePassword.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }
}
