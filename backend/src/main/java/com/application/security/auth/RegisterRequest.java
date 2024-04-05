package com.application.security.auth;


import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
@EqualsAndHashCode
@ToString
public class RegisterRequest {

	private String username;
	@Email
	private String email;
	private List<String> role;
	private String password;
	private boolean mfaEnabled;
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

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}
}
