//package com.application.security.controller;
//
//import com.application.security.dto.ChangePasswordRequest;
//import com.application.security.services.ChangePasswordService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PatchMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.security.Principal;
//
//@RestController
//@RequestMapping("/api/v1/changermdp")
//@RequiredArgsConstructor
//public class ChangerPasswordController {
//	private final ChangePasswordService changePassword;
//
//    @PatchMapping
//    public ResponseEntity<?> changePassword(
//          @RequestBody ChangePasswordRequest request,
//          Principal connectedUser
//    ) {
//        changePassword.changePassword(request, connectedUser);
//        return ResponseEntity.ok().build();
//    }
//
//}
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
        if (connectedUser != null) {
            changePassword.changePassword(request, connectedUser);
            return ResponseEntity.ok().build();
        } else {
            // Handle the case where connectedUser is null
            // You might throw an exception, return a specific response, or handle it in another appropriate way
            return ResponseEntity.badRequest().body("No authenticated user found.");
        }
    }

}
