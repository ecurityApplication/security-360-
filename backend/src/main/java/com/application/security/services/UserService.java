package com.application.security.services;


import com.application.security.dto.UserDTO;
import com.application.security.entity.User;


import java.util.List;
import java.util.Map;

public interface UserService {
    void DeleteUser(Long id);
    List< User> getAllUser();
    void addUser(UserDTO userDTO);
    void updateUserById(Long id, UserDTO userDTO);
}