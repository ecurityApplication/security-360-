package com.application.security.services;


import com.application.security.dto.UserDTO;
import com.application.security.entity.User;


import java.util.List;

public interface UserService {
    void DeleteUser(Long id);
    //List< User> getAllUser();
    public List<User> getAllUsers();
    void addUser(UserDTO userDTO);
    void updateUserById(Long id, UserDTO userDTO);
    Object getUserById(long id);
}