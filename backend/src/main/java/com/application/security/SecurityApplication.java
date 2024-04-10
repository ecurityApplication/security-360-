package com.application.security;

import com.application.security.configSecurity.ApplicationConfig;
import com.application.security.entity.Role;
import com.application.security.entity.User;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class SecurityApplication {
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	ApplicationConfig applicationConfig;
	public static void main(String[] args) {
		SpringApplication.run(SecurityApplication.class, args);
	}
	// @Bean
	// CommandLineRunner start() {


	// 	return args -> {
	// 		System.out.println("run");
	// 		List<Role> roles = (List<Role>) roleRepository.findAll();
	// 		if (roles.isEmpty()) {
	// 			Role roleAdmin = new Role();
	// 			roleAdmin.setRoleName("ROLE_ADMIN");
	// 			roleRepository.save(roleAdmin);
	// 			Role roleUSER = new Role();
	// 			roleUSER.setRoleName("ROLE_USER");
	// 			roleRepository.save(roleUSER);
	// 			Role roleModerator = new Role();
	// 			roleModerator.setRoleName("ROLE_MODERATOR");
	// 			roleRepository.save(roleModerator);
	// 		}


//			if (!userRepository.existsByEmail("sirinerezgui585@gmail.com")) {
//				String bcrypt = applicationConfig.passwordEncoder().encode("12345678");
//				List<Role> rolesAdmin = new ArrayList<>();
//				Role r = roleRepository.findByName("ROLE_ADMIN")
//						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//				rolesAdmin.add(r);
//				User user = new User();
//				user.setRoles(rolesAdmin);
//				user.setUsername("admin");
//				user.setPassword(bcrypt);
//				user.setEmail("sirinerezgui585@gmail.com");
//				userRepository.save(user);
//			}

		// };

	//}
}
