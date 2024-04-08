package com.application.security.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String email;
    private boolean enable;
    private String roleName;

}
