package com.application.security.entity;

import com.application.security.token.Token;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
	private String username;
	private String email;
	private String password;
	private Boolean enabled = false;
	private boolean mfaEnabled;// tell the backend if the user will use the 2FA or not
	private String secret;// if the user use mFA it generate a new secrete
	// Role-Based Authentication
	// the many user might have different role
	@ManyToMany(fetch = FetchType.EAGER)//indicates that while fetching User object, also fetch roles simultaneously
	@JoinTable(name = "users_roles",
			joinColumns = { @JoinColumn(name = "user_Id") },
			inverseJoinColumns = { @JoinColumn(name = "role_Id") })
	@JsonIgnore
	private List<Role> roles;
	@JsonIgnore
	@OneToMany(mappedBy = "user") // one user belongs to many tokens
	// it's indicating that there can be multiple Token entities associated with a
	// single User entity
	private List<Token> tokens;

	public User(String username, String email, String password, List<Role> roles) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.roles = roles;
	}

	public User(User user) {
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles.stream()
				.map(role -> new SimpleGrantedAuthority(role.getRoleName()))
				.collect(Collectors.toList());
	}
	//@Override // Annotation indicating that this method overrides a method in the superclass
	//public Collection<? extends GrantedAuthority> getAuthorities() {
	//	return List.of(new SimpleGrantedAuthority(role.getName().name()));
	//}

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

	public void setId(Long id) {
		this.id = id;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setEnable(boolean enabled) {
		this.enabled = enabled;
	}
	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public void setMfaEnabled(boolean mfaEnabled) {
		this.mfaEnabled = mfaEnabled;
	}
	public void setSecret(String secret) {
		this.secret = secret;
	}
	public void setTokens(List<Token> tokens) {
		this.tokens = tokens;
	}
}