package com.application.security.demoController;

import com.application.security.entity.Role;
import com.application.security.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/role")
public class RoleController {
    @Autowired
    RoleService roleService;

    @GetMapping("/retrieve-all-role")
    public List<Role> getAllRole() {
        List<Role> list = roleService.RetreiveAllRole();
        return list;
    }
    @PostMapping("/Add-role")
    public Role addRole(@RequestBody Role role){
        return roleService.AddRole(role);
    }

    @DeleteMapping("/remove-role/{role-id}")
    @ResponseBody
    public void removeRole(@PathVariable("role-id") Long id) {
        roleService.DeleteRole(id);
    }

    @PutMapping(value="/modifyrole/{role-id}")
    public Role modify(@PathVariable (name="role-id") Long id, @RequestBody Role role) {
        return roleService.updateRole(role, id);
    }
}

