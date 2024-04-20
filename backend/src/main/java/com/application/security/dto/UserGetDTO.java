package com.application.security.dto;

import com.application.security.entity.Role;
import com.application.security.entity.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserGetDTO {
    private Long id;
    private String username;
    private String email;
    private List<String> roleName;
    public static UserGetDTO UserToUserDto(User user) {
        UserGetDTO userGetDTO = new UserGetDTO();
        userGetDTO.setId(user.getId());
        userGetDTO.setUsername(user.getUsername());
        userGetDTO.setEmail(user.getEmail());


        List<String> names = new ArrayList<>();
        List<Role> roles = user.getRoles();
        for (Role role: roles) {
            names.add(role.getRoleName());
        }
        userGetDTO.setRoleName( names );
        return userGetDTO;
    }

    public static List<UserGetDTO> UsersToUserDtos(List<User> users) {
        List<UserGetDTO> userDtos = new ArrayList<>();
        for (int i = 1; i < users.size(); i++) {
            User user = users.get(i);
            userDtos.add(UserToUserDto(user));
        }
        return userDtos;
    }


}
