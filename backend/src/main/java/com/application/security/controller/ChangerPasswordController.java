package com.application.security.controller;

import com.application.security.dto.ChangePasswordRequest;
import com.application.security.services.ChangePasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/changermdp")
@RequiredArgsConstructor
public class ChangerPasswordController {
	private final ChangePasswordService changePassword;

    @PostMapping
    public ResponseEntity<?> changePassword(
          @RequestBody ChangePasswordRequest request,
          Principal connectedUser
    ) {
        changePassword.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

}
