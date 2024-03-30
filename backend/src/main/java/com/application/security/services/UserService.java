package com.application.security.services;

import com.application.security.entity.User;


import java.util.List;

public interface UserService {
    // Retrieves all users
    List<User> findAll();
    // Saves a user
    User save(User user) ;
    Object getUserById(long id);

    // Retrieves a user by email
    User findOne(String email);
   User updateUser(Long id, User updatedUser) ;
    void DeleteUser(Long id);


}
