package com.application.security.services;



import com.application.security.entity.Role;

import java.util.List;

public interface RoleService {
    Role AddRole(Role role);
    public void DeleteRole(Long id);
    List<Role> RetreiveAllRole ();
    Role updateRole(Role role, Long id);;

}
