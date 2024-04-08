package com.application.security.demoController;
import com.application.security.dto.DtoConverter;
import com.application.security.dto.UserDTO;
import com.application.security.entity.Role;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

import com.application.security.entity.User;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.UserRepository;
import com.application.security.services.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

//@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
@Autowired
UserRepository userRepository;
@Autowired
RoleRepository roleRepository;
@Autowired
PasswordEncoder passwordEncoder;
@Autowired
UserService userService;


    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return userService.getAllUser();
    }
    @DeleteMapping("/remove-user/{id}")
    public void removeUser(@PathVariable("id") Long id) {
        userService.DeleteUser( id );
    }

    @PostMapping ("Add-user")
    public ResponseEntity<Object> addUser(@RequestBody UserDTO userDTO) {
        userService.addUser(userDTO);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User added successfully");
        response.put("status", "success");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("updateUser/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        userService.updateUserById(id, userDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User updated successfully");
        response.put("status", "success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}

