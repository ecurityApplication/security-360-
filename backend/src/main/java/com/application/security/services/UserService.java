package com.application.security.services;


import com.application.security.dto.UserDTO;
import com.application.security.dto.UserGetDTO;
import com.application.security.entity.User;
import jakarta.servlet.http.HttpServletRequest;

import java.security.Principal;
import java.util.List;

public interface UserService {
    void DeleteUser(Long id);
    //public List<UserDTO> getAllUsers();
    //List< User> getAllUser();
    //public List<User> getAllUsers();
    public List<UserGetDTO> getAllUsers();
    //void addUser(UserDTO userDTO);
    public User updateUser(Long userId, UserDTO userDTO);
    Object getUserById(long id);
    public void initRoleAndUser();
    public   User registerNewUser(UserDTO userDTO);


}