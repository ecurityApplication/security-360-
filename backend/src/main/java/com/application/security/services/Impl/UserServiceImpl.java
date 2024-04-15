package com.application.security.services.Impl;

import com.application.security.configSecurity.JwtService;
import com.application.security.dto.UserDTO;
import com.application.security.dto.UserGetDTO;
import com.application.security.entity.Role;
import com.application.security.entity.User;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.UserRepository;
import com.application.security.entity.Token;
import com.application.security.repository.TokenRepository;
import com.application.security.entity.TokenType;
import com.application.security.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
    @Autowired
    JwtService jwtService;
    @Autowired
    TokenRepository tokenRepository;

    @Override
    public void DeleteUser(Long id) {
        userRepository.deleteById( id );
    }

    @Override
    public List<UserGetDTO> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        return StreamSupport.stream( users.spliterator(), false )
                .filter( user -> !"ROLE_ADMIN".equalsIgnoreCase( user.getUsername() ) )
                .map( user -> new ModelMapper().map( user, UserGetDTO.class ) )
                .collect( Collectors.toList() );
    }

    @Override
    public User registerNewUser(UserDTO userDTO) {

        User user = new User();
        user.setUsername( userDTO.getUsername() );
        user.setPassword( passwordEncoder.encode( userDTO.getPassword() ) );
        user.setEmail( userDTO.getEmail() );
        user.setEnabled( true );

        // add roles to users
        String strRoles = userDTO.getRoleName();
        List<Role> roles = new ArrayList<>();

        switch (strRoles) {

            case "ROLE_MODERATOR":
                Role moderatorRole = roleRepository.findByRoleName( "ROLE_MODERATOR" )
                        .orElseThrow( () -> new RuntimeException( "Error: Role is not found." ) );
                roles.add( moderatorRole );
                break;
            default:
                Role userRole = roleRepository.findByRoleName( "ROLE_USER" )
                        .orElseThrow( () -> new RuntimeException( "Error: Role is not found." ) );
                roles.add( userRole );
                break;
        }

        user.setRoles( roles );  // Set the user's roles (List<Role>)
        // Save the user entity to the database
        var savedUser = userRepository.save( user );

        // Save user token (not sure about the implementation of saveUserToken method)
        saveUserToken( savedUser, jwtService.generateToken( user ) );
        sendUserRegistrationEmail( user, userDTO.getPassword() );

        // Return the saved user entity
        return savedUser;
    }


    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user( user )
                .token( jwtToken )
                .tokenType( TokenType.BEARER )
                .expired( false )
                .revoked( false )
                .build();
        tokenRepository.save( token );
    }

    private void sendUserRegistrationEmail(User user, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo( user.getEmail() );
        message.setSubject( "Welcome to Our Application" );
        message.setText( "Hello " + user.getUsername() + ",\n\n"
                + "Welcome to our application!\n\n"
                // + "Your username: " + user.getUsername() + "\n"
                + "Your password: " + password + "\n"
                // + "Your role: " + user.getRoles().get(0).getRoleName() + "\n"
                + "Use this information to login to our application.\n\n"
                + "Thank you!" );

        emailSender.send( message );
    }


    @Override
    public User updateUser(Long userId, UserDTO userDTO) {
        // Find the user by ID
        User user = userRepository.findById( userId )
                .orElseThrow( () -> new RuntimeException( "User not found" ) );

        // Update user details
        user.setUsername( userDTO.getUsername() );
        user.setPassword( passwordEncoder.encode( userDTO.getPassword() ) ); // You may want to add checks to prevent password update if not provided
        user.setEmail( userDTO.getEmail() );
        user.setEnabled( true ); // Corrected isEnable to isEnabled

        // Update roles
        String strRoles = userDTO.getRoleName();
        List<Role> roles = new ArrayList<>();

        // Iterate through the role names provided in the DTO

        Role role = roleRepository.findByRoleName( strRoles )
                .orElseThrow( () -> new RuntimeException( "Role not found: " + strRoles ) );
        roles.add( role );


        user.setRoles( roles );
        sendUserRegistrationEmail( user, userDTO.getPassword() );
        // Save the updated user entity to the database
        return userRepository.save( user );
    }


    private void sendUserUpdatingEmail(User user, String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo( user.getEmail() );
        message.setSubject( "\"Your account information has been updated\"" );
        message.setText( "Dear " + user.getUsername() + ",\n\n" +
                "Your account information has been updated.\n" +
                "Username: " + user.getUsername() + "\n" +
                "New Password: " + newPassword + "\n\n" +
                "Thank you for using our service." );

        emailSender.send( message );
    }

    @Override
    public Object getUserById(long id) {
        return userRepository.findById( id );
    }

    @Override
    public void initRoleAndUser() {

        List<Role> roles = (List<Role>) roleRepository.findAll();
        if (roles.isEmpty()) {
            Role roleAdmin = new Role();
            roleAdmin.setRoleName( "ROLE_ADMIN" );
            roleRepository.save( roleAdmin );

            Role roleUSER = new Role();
            roleUSER.setRoleName( "ROLE_USER" );
            roleRepository.save( roleUSER );

            Role roleModerator = new Role();
            roleModerator.setRoleName( "ROLE_MODERATOR" );
            roleRepository.save( roleModerator );
        }
    }

}






