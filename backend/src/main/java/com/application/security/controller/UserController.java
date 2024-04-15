package com.application.security.controller;
import com.application.security.dto.UserDTO;
import com.application.security.dto.UserGetDTO;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;

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
    public List<UserGetDTO> getAllUsers(){
        return userService.getAllUsers();
    }

    @DeleteMapping("/remove-user/{id}")
    public void removeUser(@PathVariable("id") Long id) {
        userService.DeleteUser( id );
    }

    @PostMapping ("/Add-user")
    public User registerNewUser(@RequestBody UserDTO userDTO) {

        return userService.registerNewUser(userDTO);
    }

    @PutMapping("/updateUser/{id}")
    public User updateUserRolesById(@PathVariable(name = "id") Long userId, @RequestBody UserDTO userDTO){
        return userService.updateUser(userId, userDTO );
    }

    // get incident by id rest api
    @GetMapping("/getUserById/{id}")
    @ResponseBody
    public ResponseEntity<User> getUserById(@PathVariable(name = "id") long id){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not exist with id :" + id));
        return ResponseEntity.ok(user);
    }

    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

}

