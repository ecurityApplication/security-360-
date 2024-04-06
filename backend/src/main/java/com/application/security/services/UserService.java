package com.application.security.services;


import com.application.security.entity.User;
import jakarta.mail.MessagingException;


import java.util.List;

public interface Userservice {
    List<User> RetreiveAllUser ();
    User Adduser (User user);
    User updateUser(User user ,Long id) throws MessagingException;
    public void DeleteUser(Long id);


}
