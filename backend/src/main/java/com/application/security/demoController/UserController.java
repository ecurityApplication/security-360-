package com.application.security.demoController;

import com.application.security.entity.Incident;
import com.application.security.entity.User;
import com.application.security.repository.UserRepository;
import com.application.security.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:4200" )
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor


public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @GetMapping("/getAllUser")
    @ResponseBody
    public List<User> getAllUser(){
        List<User>list=userService.getAllUser();
        return list;
    }
    @PostMapping("/addUser")
    @ResponseBody
    public User AjouterUser(@RequestBody User i){
        return userService.AjouterUser(i);
    }
    @DeleteMapping("/deleteUser/{id}")
    @ResponseBody
    public void DeleteUser(@PathVariable("id")Long id){

        userService.DeleteUser(id);
    }
    @GetMapping("/getUserById/{id}")
    @ResponseBody
    public ResponseEntity<User> getUserById(@PathVariable(name = "id") long id){
         User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not exist with id :" + id));
        return ResponseEntity.ok(user);}
    @PutMapping("/updateUser/{id}")
    @ResponseBody
    public ResponseEntity<User> updateUser(@PathVariable(name = "id") Long id, @RequestBody  User user) {
        User updated = userService.updateUser(id, user);
        if(updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            // Handle the case where the incident was not found
            return ResponseEntity.notFound().build();
        }
    }

}

