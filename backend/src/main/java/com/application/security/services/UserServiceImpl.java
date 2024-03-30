package com.application.security.services;

import com.application.security.entity.Role;
import com.application.security.entity.User;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;


    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        repository.save(user);
    }
//add it





    // Find all users
    public List<User> findAll() {
        //return (List<User>) repository.findAll();
        List<User> list = new ArrayList<>();
        repository.findAll().iterator().forEachRemaining(list::add);
        return list;
    }



    // Save user
    public void DeleteUser(Long id) {
     repository.deleteById(id);
    }

    public Object getUserById(long id){
    return repository.findById(id);
    }

    //public User updateUser(Long id, User updatedUser) {
    //       Optional<User> optionalUser = repository.findById(id);
    //    if (optionalUser.isPresent()) {
    //        User existingUser = optionalUser.get();
    //          existingUser.setFirstname(updatedUser.getFirstname());
    //          existingUser.setLastname(updatedUser.getLastname());
    //          existingUser.setEmail(updatedUser.getEmail());
    ////          existingUser.setPassword(updatedUser.getPassword());
//                existingUser.setMfaEnabled(updateUser.getMfaEnabled());
    //        existingUser.setSecret(updatedUser.getSecret());
    //          return repository.save(existingUser);
    //      } else {
    // Handle the case
    //          throw new EmptyResultDataAccessException(1);
    //      }

    //   }



}
