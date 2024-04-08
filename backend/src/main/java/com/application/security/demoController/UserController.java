	package com.application.security.demoController;

    import com.application.security.entity.Role;
    import com.application.security.entity.User;
    import com.application.security.repository.RoleRepository;
    import com.application.security.repository.UserRepository;
    import com.application.security.services.UserServiceImpl;
    import jakarta.mail.MessagingException;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.web.bind.annotation.*;

    import java.util.*;

//    @CrossOrigin("*")
   @CrossOrigin(origins = "http://localhost:4200" )

    @RestController
    @RequestMapping("/api/v1/user")
    public class UserController {
        @Autowired
        UserServiceImpl userService;
        @Autowired
        private UserRepository userRepository;
        @Autowired
        RoleRepository roleRepository;
        @Autowired
        PasswordEncoder encoder;
//        private Map<String, Object> userMap = new HashMap<>();

        @GetMapping("/retrieve-all-user")
        @ResponseBody
        public List<User> getAllUsers() {
            return userService.RetreiveAllUser();

        }

        @PostMapping("/Add-user")

        public ResponseEntity<Object> addUser(@RequestBody Map<String, Object> requestBody) {

            // Check if userMap is null
            if (requestBody == null || !requestBody.containsKey("user") || !requestBody.containsKey("role")) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Invalid request body");
                response.put("status", "error");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            // Extract user and role data from the request body
            Map<String, Object> userMap = (Map<String, Object>) requestBody.get("user");
            String roleName = (String) requestBody.get("role");

            // Create and save the User entity
            User user = new User();
            user.setUsername((String) userMap.get("username"));
            user.setPassword( encoder.encode((CharSequence) userMap.get("password")));
            user.setEmail((String) userMap.get("email"));
            user.setMfaEnabled((boolean) userMap.get("mfaEnabled"));
            userRepository.save(user);

            // Find the role by name
             Optional<Role> roleOptional = roleRepository.findByName(roleName);

            // If role doesn't exist, create and save it
            Role role;
            if (roleOptional.isPresent()) {
                role = roleOptional.get();
            } else {
                role = new Role(roleName);
                roleRepository.save(role);
            }
            user.setRoles(new ArrayList<>());
            user.getRoles().add(role);
            userRepository.save(user);

            // Assign the role to the user
            userRepository.save(user);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User added successfully");
            response.put("status", "success");

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @PutMapping(value="/modifyuser/{user-id}")
        public User modify(@PathVariable (name="user-id") Long id, @RequestBody  Map<String, Object> requestBody) throws MessagingException {
            return userService.updateUser(requestBody, id);
        }

        @DeleteMapping("/remove-user/{user-id}")
        @ResponseBody
        public void removeUser(@PathVariable("user-id") Long id) {
            userService.DeleteUser( id );
        }
    }
