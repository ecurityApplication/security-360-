package com.application.security.services;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.application.security.entity.Incident;
import com.application.security.entity.User;
import com.application.security.repository.Incidentrepository;
import com.application.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    UserRepository repUser;

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


public List<User> getAllUser() {
        return (List<User>) repUser.findAll();
    }
    public User AjouterUser(User i) {
        repUser.save(i);
        return i;
    }

    public void DeleteUser(Long iduser) {
        repUser.deleteById(iduser);
    }
    public Object getUserById(long id){
        return repUser.findById(id);
    }

    public User updateUser(Long id, User updateUser) {
            Optional<User> optionalUser = repUser.findById(id);
            if (optionalUser.isPresent()) {
                User existingUser = optionalUser.get();
                existingUser.setFirstname(updateUser.getFirstname());
                existingUser.setLastname(updateUser.getLastname());
                existingUser.setEmail(updateUser.getEmail());
                existingUser.setPassword(updateUser.getPassword());
//                existingUser.setMfaEnabled(updateUser.getMfaEnabled());
                existingUser.setSecret(updateUser.getSecret());
                return repUser.save(existingUser);
            } else {
                // Handle the case
                throw new EmptyResultDataAccessException(1);
            }

        }







    }

