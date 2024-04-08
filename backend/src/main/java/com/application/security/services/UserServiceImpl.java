package com.application.security.services;


import com.application.security.dto.UserDTO;
import com.application.security.entity.Role;
import com.application.security.entity.User;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JavaMailSender emailSender;

    @Override
    public void DeleteUser(Long id) {
        userRepository.deleteById( id );
    }

    @Override
    public List<User> getAllUser() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public void addUser(UserDTO userDTO) {

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode( userDTO.getPassword() ));
        user.setEmail( userDTO.getEmail() );
        user.setEnable( true );
        userRepository.save(user);

        Optional<Role> roleOptional = roleRepository.findByRoleName(userDTO.getRoleName());

        Role role;
        if (roleOptional.isPresent()) {
            role = roleOptional.get();
        } else {
            role = new Role( userDTO.getRoleName() );
            roleRepository.save(role);
        }
        user.setRoles(new ArrayList<>());
        user.getRoles().add(role);
        userRepository.save(user);
        sendUserRegistrationEmail( user, userDTO.getPassword() );
    }


    private void sendUserRegistrationEmail(User user,String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Welcome to Our Application");
        message.setText("Hello " + user.getUsername() + ",\n\n"
                + "Welcome to our application!\n\n"
                + "Your username: " + user.getUsername() + "\n"
                + "Your password: " + password + "\n"
                + "Your role: " + user.getRoles().get(0).getRoleName() + "\n"
                + "Use this information to login to our application.\n\n"
                + "Thank you!");

        emailSender.send(message);
    }

    @Override
    public void updateUserById(Long id, UserDTO userDTO) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUsername(userDTO.getUsername());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setEmail(userDTO.getEmail());
            user.setEnable(userDTO.isEnable());
            userRepository.save(user);

            Optional<Role> roleOptional = roleRepository.findByRoleName(userDTO.getRoleName());
            Role role;
            if (roleOptional.isPresent()) {
                role = roleOptional.get();
            } else {
                role = new Role(userDTO.getRoleName());
                roleRepository.save(role);
            }

            // Clear existing roles and add the new one
            user.setRoles(new ArrayList<>());
            user.getRoles().add(role);
            userRepository.save(user);

            sendUserUpdatingEmail(user,userDTO.getPassword());
        } else {
            throw new ResponseStatusException( HttpStatus.NOT_FOUND, "User not found with id: " + id);
        }
    }

    private void sendUserUpdatingEmail(User user,String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("\"Your account information has been updated\"");
        message.setText("Dear " + user.getUsername() + ",\n\n" +
                "Your account information has been updated.\n" +
                "Username: " + user.getUsername() + "\n" +
                "New Password: " + newPassword + "\n\n" +
                "Thank you for using our service.");

        emailSender.send(message);
    }
}


