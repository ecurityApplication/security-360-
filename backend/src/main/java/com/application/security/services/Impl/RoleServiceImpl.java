package com.application.security.services.Impl;


import com.application.security.entity.Role;
import com.application.security.repository.RoleRepository;
import com.application.security.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public Role AddRole(Role role) {
        return roleRepository.save(role);
    }
    @Override
    public void DeleteRole(Long id) {
         roleRepository.deleteById(id);

    }
    @Override
    //public List<Role> RetreiveAllRole() {
       // return roleRepository.findAll();
   // }
    public List<Role> RetreiveAllRole(){
        List<Role> roles = roleRepository.findAll();
        return roles.stream()
                .filter(role -> !role.getRoleName().equalsIgnoreCase("ROLE_ADMIN")) 
                .map(role -> new ModelMapper().map(role, Role.class))
                .collect( Collectors.toList());
    }
    @Override
    public Role updateRole(Role role, Long id) {
        role.setId(id);
        return roleRepository.save(role);
    }
}
