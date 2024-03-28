package com.application.security.entity;

import com.application.security.token.Token;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
//@Getter// Generating getters  method using Lombok
//@Setter// Generating getters, setters, equals, hashCode, and toString methods using Lombok
@Getter
@Setter
@AllArgsConstructor// Generating an all-argument constructor using Lombok
@NoArgsConstructor// Generating a no-argument constructor using Lombok
@Entity//transform from class to table  in database
@Builder// Adding builder pattern support using Lombok (add data in database without creating the requet manually
@Table(name="_user")// Specifying the table name for this entity in the database
public class User implements UserDetails {
	@Id// Marking the field as primary key
	@GeneratedValue(strategy = GenerationType.AUTO)// Generating the value automatically for the field
	private Long id;
	private String firstname;
	private String lastname;
	private String email;
	private String password;
	private boolean mfaEnabled;//tell the backend if the user will use the 2FA or not
	private String secret;//if the user use mFA it generate a new secrete

//	@Enumerated(EnumType.STRING)// Specifying that the field should be persisted as a string in the database
	private Role role;// Declaring a field named role of type Role enum
	@OneToMany(mappedBy = "user")//one user belongs to many tokens
//it's indicating that there can be multiple Token entities associated with a single User entity
	private List<Token> tokens;


	@Override// Annotation indicating that this method overrides a method in the superclass
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of( new SimpleGrantedAuthority( role.name() ) );
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
