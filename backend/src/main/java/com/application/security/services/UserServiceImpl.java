package com.application.security.services;


import com.application.security.entity.Incident;
import com.application.security.entity.Role;
import com.application.security.entity.User;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class UserServiceImpl implements Userservice {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public List<User> RetreiveAllUser() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public User Adduser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user, Long id) throws MessagingException {
        user.setId(id);
        User userToUpdate= userRepository.findById(id).get();


        return userRepository.save(user);
    }
    public User updateUser(Map<String, Object> requestBody, Long id) {
        // Extract user and role information from the request body
        Map<String, Object> userMap = (Map<String, Object>) requestBody.get("user");
        String password = (String) userMap.get("password");
         //.password(passwordEncoder.encode(request.getPassword()))
        String email = (String) userMap.get("email");
        Boolean enable = (Boolean) userMap.get("enable");
        String username = (String) userMap.get("username");
        String roleName = (String) requestBody.get("role");

        // Find the user by ID
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Update user information
            //user.setPassword(password);
            user.setPassword( passwordEncoder.encode(password) );
            user.setEmail(email);
            user.setMfaEnabled(enable != null ? enable : false);
            user.setUsername(username);

            // Find the role by name
            Optional<Role> optionalRole = roleRepository.findByName(roleName);
            if (optionalRole.isPresent()) {
                Role role = optionalRole.get();
                // Update user's roles
                user.getRoles().clear();
                user.getRoles().add(role);
            }

            // Save the updated user
            return userRepository.save(user);
        } else {
            // User not found
            return null;
        }
    }
    @Override
    public void DeleteUser(Long id) {
        userRepository.deleteById(id);
    }








}

