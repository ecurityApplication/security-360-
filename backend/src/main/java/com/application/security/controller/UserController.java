package com.application.security.controller;

import com.application.security.dto.Response;
import com.application.security.dto.UserDTO;
import com.application.security.dto.UserGetDTO;
import com.application.security.entity.User;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.UserRepository;
import com.application.security.services.UserService;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
        return userService.getUsers();
    }

    @DeleteMapping("/remove-user/{id}")
    public void removeUser(@PathVariable("id") Long id) {
        userService.DeleteUser( id );
    }

    @PostMapping ("/Add-user")
    public ResponseEntity<Response> registerNewUser(@RequestBody @Valid UserDTO userDTO, final HttpServletRequest request) {

        return userService.registerNewUser(userDTO,request);
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

    //count user per role
   @GetMapping("/user-count")
   public Map<String, Long> getUserCountPerRole() {
       return userService.countUsersPerRole();
   }
}

