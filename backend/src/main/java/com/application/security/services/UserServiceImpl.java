package com.application.security.services;


import com.application.security.entity.Role;
import com.application.security.entity.User;
import com.application.security.repository.RoleRepository;
import com.application.security.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class UserServiceImpl implements Userservice {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<User> RetreiveAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User Adduser(User user) {
        return userRepository.save(user);
    }


  





}

