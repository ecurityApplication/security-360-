package com.application.security.auth;


import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class RegisterRequest {
	@NotBlank
	@Size(min = 3, max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	private List<String> role;

	@NotBlank
	@Size(min = 6, max = 40)
	private String password;
	@Column

	private boolean mfaEnabled;



	public RegisterRequest(String username, String email, List<String> role, String password, boolean mfaEnabled) {
		this.username = username;
		this.email = email;
		this.role = role;
		this.password = password;
		this.mfaEnabled = mfaEnabled;

	}

	public RegisterRequest(String username, String email, String password, boolean mfaEnabled) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.mfaEnabled = mfaEnabled;

	}

	public RegisterRequest(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;


	}

	public RegisterRequest() {
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getRole() {
		return role;
	}

	public void setRole(List<String> role) {
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isMfaEnabled() {
		return mfaEnabled;
	}

	public void setMfaEnabled(boolean mfaEnabled) {
		this.mfaEnabled = mfaEnabled;
	}
}
