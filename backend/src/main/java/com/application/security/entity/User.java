package com.application.security.entity;

import com.application.security.token.Token;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

//@Getter// Generating getters  method using Lombok
//@Setter// Generating getters, setters, equals, hashCode, and toString methods using Lombok
@Getter
@Setter
@AllArgsConstructor // Generating an all-argument constructor using Lombok
@NoArgsConstructor // Generating a no-argument constructor using Lombok
@Entity // transform from class to table in database
@Builder // Adding builder pattern support using Lombok (add data in database without
			// creating the requet manually
@Table(name = "_user") // Specifying the table name for this entity in the database
public class User implements UserDetails {
	@Id // Marking the field as primary key
	@GeneratedValue(strategy = GenerationType.AUTO) // Generating the value automatically for the field
	private Long id;
	private String firstname;
	private String lastname;
	private String email;
	private String password;
	private boolean mfaEnabled;// tell the backend if the user will use the 2FA or not
	private String secret;// if the user use mFA it generate a new secrete
	// Role-Based Authentication
	// the many user might have different role
	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;
	 //@Enumerated(EnumType.STRING)// Specifying that the field should be persisted
	// as a string in the database
	 //private ERole role;// Declaring a field named role of type Role enum
	@OneToMany(mappedBy = "user") // one user belongs to many tokens
	// it's indicating that there can be multiple Token entities associated with a
	// single User entity
	private List<Token> tokens;

	@Override // Annotation indicating that this method overrides a method in the superclass
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.getName().name()));

	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
