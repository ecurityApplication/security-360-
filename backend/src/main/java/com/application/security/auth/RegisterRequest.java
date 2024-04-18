package com.application.security.auth;


import jakarta.validation.constraints.Email;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@EqualsAndHashCode
@ToString
@Getter
@Setter
public class RegisterRequest {

	private String username;
	@Email
	private String email;
	private List<String> role;
	private String password;
	private boolean mfaEnabled = true;
	private  boolean enable;
	public RegisterRequest(String username, String email, List<String> role, String password, boolean enable) {
		this.username = username;
		this.email = email;
		this.role = role;
		this.password = password;
		this.enable = enable;
	}

	public RegisterRequest(String username, String email, String password, boolean enable) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.enable = enable;
	}

	public RegisterRequest(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public RegisterRequest() {
	}


}
