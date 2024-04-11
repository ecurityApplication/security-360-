package com.application.security.services;

import com.application.security.auth.AuthenticationResponse;
import com.application.security.configSecurity.JwtService;
import com.application.security.dto.UserDTO;
import com.application.security.entity.Role;
import com.application.security.entity.User;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.UserRepository;
import com.application.security.token.Token;
import com.application.security.token.TokenRepository;
import com.application.security.token.TokenType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JavaMailSender emailSender;
    @Autowired
    JwtService jwtService;
    @Autowired
    TokenRepository tokenRepository;
    @Override
    public void DeleteUser(Long id) {
        userRepository.deleteById( id );
    }

    @Override
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public AuthenticationResponse registerNewUser(UserDTO userDTO) {

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode( userDTO.getPassword() ));
        user.setEmail( userDTO.getEmail() );
        user.setEnabled( true );

        // Find the "ROLE_USER" role by name
        Optional<Role> userRole = roleRepository.findByRoleName(userDTO.getRoleName());

        // Set user roles if required (optional)
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole.get());  // Add the retrieved role to the set
        List<Role> rolesList = new ArrayList<>(userRoles);
        user.setRoles(rolesList);  // Set the user's roles (List<Role>)

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        sendUserRegistrationEmail( user, userDTO.getPassword() );
        // Save the user entity to the database
        var savedUser = userRepository.save(user);


        // Generate JWT token and refresh token
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        // Save user token (not sure about the implementation of saveUserToken method)
        saveUserToken(savedUser, jwtToken);
        // Return authentication response with tokens and MFA details
        return AuthenticationResponse.builder()
                 .accessToken(jwtToken)
                 .refreshToken(refreshToken)
                .build();
    }
    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType( TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
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
    public User updateUserById(Long id, UserDTO userDTO) {

        // Find the user by ID
        Optional<User> existingUserOptional = userRepository.findById(id);

        // Check if user exists
        if (existingUserOptional.isEmpty()) {
            throw new RuntimeException("User with ID " + id + " not found!");
        }

        User existingUser = existingUserOptional.get();

        // Update user details (avoid overwriting password if not provided)
        existingUser.setUsername(userDTO.getUsername() != null ? userDTO.getUsername() : existingUser.getUsername());
        existingUser.setEmail(userDTO.getEmail() != null ? userDTO.getEmail() : existingUser.getEmail());

        // Find the updated role (optional)
        Optional<Role> updatedRoleOptional = Optional.empty(); // Initialize as empty
        if (userDTO.getRoleName() != null) {
            updatedRoleOptional = roleRepository.findByRoleName(userDTO.getRoleName());
            if (updatedRoleOptional.isEmpty()) {
                throw new RuntimeException("User role " + userDTO.getRoleName() + " not found!");
            }
        }

        // Update user roles if provided
        if (updatedRoleOptional.isPresent()) {
            Set<Role> userRoles = new HashSet<>();
            userRoles.add(updatedRoleOptional.get());
            existingUser.setRoles(new ArrayList<>(userRoles));
        }

        // Encode password only if provided in DTO
        if (userDTO.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        // Save the updated user
        return userRepository.save(existingUser);
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

    @Override
    public Object getUserById(long id){
        return userRepository.findById(id);
    }

    @Override
    public void initRoleAndUser() {

        List<Role> roles = (List<Role>) roleRepository.findAll();
        if (roles.isEmpty()) {
            Role roleAdmin = new Role();
            roleAdmin.setRoleName( "ROLE_ADMIN" );
            roleRepository.save( roleAdmin );

            Role roleUSER = new Role();
            roleUSER.setRoleName("ROLE_USER");
            roleRepository.save(roleUSER);

            Role roleModerator = new Role();
            roleModerator.setRoleName("ROLE_MODERATOR");
            roleRepository.save(roleModerator);
        }
    }
    }






