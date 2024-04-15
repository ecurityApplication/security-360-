package com.application.security.controller;

import com.application.security.dto.ChangePasswordRequest;
import com.application.security.services.ChangePasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/changermdp")
@RequiredArgsConstructor
public class ChangerPasswordController {
	private final ChangePasswordService changePassword;

    @PatchMapping
    public ResponseEntity<?> changePassword(
          @RequestBody ChangePasswordRequest request,
          Principal connectedUser
    ) {
        changePassword.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

}
