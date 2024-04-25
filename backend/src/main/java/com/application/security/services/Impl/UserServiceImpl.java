package com.application.security.services.Impl;

import com.application.security.configSecurity.JwtService;
import com.application.security.dto.Response;
import com.application.security.dto.UserDTO;
import com.application.security.dto.UserGetDTO;
import com.application.security.email.EmailSender;
import com.application.security.entity.Role;
import com.application.security.entity.User;
import com.application.security.event.RegistrationCompleteEvent;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.TokenRepository;
import com.application.security.repository.UserRepository;
import com.application.security.services.UserService;
import com.application.security.tfa.TowFactorAuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.application.security.services.ChangePasswordService.applicationUrl;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    //@Autowired
    //JavaMailSender emailSender;
    @Autowired
    JwtService jwtService;
    @Autowired
    TokenRepository tokenRepository;
    @Autowired
    TowFactorAuthenticationService tfaService;
    @Autowired
     EmailSender emailSender;
    @Autowired
     ApplicationEventPublisher publisher;
    @Override
    public void DeleteUser(Long id) {
        userRepository.deleteById( id );
    }


   /* @Override
    public List<UserGetDTO> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        return StreamSupport.stream( users.spliterator(), false )
                .filter( user -> !"ROLE_ADMIN".equalsIgnoreCase( user.getUsername() ) )
                .map( user -> new ModelMapper().map( user, UserGetDTO.class ) )
                .collect( Collectors.toList() );
    }*/
   @Override
   public List<UserGetDTO> getUsers() {
       List<User> users = StreamSupport
               .stream(userRepository.findAll().spliterator(), false)

               .collect(Collectors.toList());
       return UserGetDTO.UsersToUserDtos(users);
   }

    @Override
    public  ResponseEntity<Response> registerNewUser(UserDTO userDTO, final HttpServletRequest request) {
        boolean userExists = userRepository.findAll()
                .stream()
                .anyMatch(user -> userDTO.getEmail().equalsIgnoreCase(user.getEmail()));

        if (userExists) {
            return ResponseEntity.badRequest().body( Response.builder()
                    .responseMessage("User with provided email  already exists!")
                    .build());
        }
        // add roles to users
        String strRoles = userDTO.getRoleName();
        List<Role> roles = new ArrayList<>();


            switch (strRoles) {
                case "ROLE_MODERATOR":
                    Role adminRole = roleRepository.findByRoleName("ROLE_MODERATOR")
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                    break;

                default:
                    Role userRole = roleRepository.findByRoleName("ROLE_USER")
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
                    break;
            }



        // Create a new user entity with the provided details
        var user = User.builder()
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .roles(roles)
                .mfaEnabled(true)
                .build();

        // Generate MFA secret if enabled
        //if (request.isMfaEnabled()) {
        user.setSecret(tfaService.generateNewSecret());
        // }

        // Save the user entity to the database
        var savedUser = userRepository.save(user);
        publisher.publishEvent(new RegistrationCompleteEvent(savedUser, applicationUrl(request)));


        // Generate JWT token and refresh token
        // var jwtToken = jwtService.generateToken(user);
        //var refreshToken = jwtService.generateRefreshToken(user);

        // Save user token (not sure about the implementation of saveUserToken method)
        //saveUserToken(savedUser, jwtToken);

        // Generate QR code image URL
        String qrCodeImageUrl = tfaService.generateQrCodeImgUri(user.getSecret());

        // Send registration details to user's email
        String emailSubject = "\"Welcome to Our Application\"";
        String emailBody = "<html><body>"
                + "<p>Dear " + userDTO.getUsername() + ",</p>"
                + "<p>Thank you for registering with us!</p>"
                + "<p>Your registration details:</p>"
                + "<ul>"
                + "<li>Username: " + userDTO.getUsername() + "</li>"
                + "<li>Email: " + userDTO.getEmail() + "</li>"
                + "Your password: " + userDTO.getPassword() + "\n"
                + "</ul>"
                + "Use this information to login to our application.\n\n"
                + "Thank you!"
                + "<img src=\"data:image/png;base64," + qrCodeImageUrl + "\">"
                + "</body></html>";

        emailSender.send(user.getEmail(), emailSubject, emailBody, qrCodeImageUrl);

        // Return authentication response with tokens and MFA details
        return new ResponseEntity<>(
                Response.builder()

                        .responseMessage("Success! Please, check your email to login")
                        .email(savedUser.getEmail())
                        .secretImageUri(qrCodeImageUrl)
                        .mfaEnabled(true)
                        .build(),
                HttpStatus.CREATED
        );
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
    private void sendUserRegistrationEmail(User user, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo( user.getEmail() );
        message.setSubject( "Update Notification for Your Account" );
        message.setText( "This is to inform you that there has been an update to your account.\n\n"
                +"Hello " + user.getUsername() + ",\n\n"
                // + "Your username: " + user.getUsername() + "\n"
                + "Your password: " + password + "\n"
                // + "Your role: " + user.getRoles().get(0).getRoleName() + "\n"
                + "Use this information to login to our application.\\n\\n\" +\n" +
                " \"If you have any questions or concerns, please contact our support team.\\n\\n\" +\n" +
                "  \"Thank you for using our application.\n\n"
                + "Thank you!" );

        //emailSender.send( message );
    }



    @Override
    public Object getUserById(long id) {
        return userRepository.findById( id );
    }

    @Override
    public int getUserCountByRole(String roleName) {
        return userRepository.countUsersByRole(roleName);
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






