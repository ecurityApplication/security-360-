package com.application.security.repository;

import com.application.security.entity.Role;
import com.application.security.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User>	findByEmail(String email);
    Optional<User> getUserById(Long id);
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User findUserByUsername(String username);

    @Modifying
    @Transactional
    @Query("update User u set u.password = ?2 where u.email = ?1 ")
    void updatePassword(String email, String password);

    // Define the method to count users by role
    @Query("SELECT r.roleName, COUNT(u) AS userCount " +
            "FROM Role r " +
            "JOIN r.users u " +
            "WHERE r.roleName IN ('GUEST', 'ANALYST') " +
            "GROUP BY r.roleName")
    List<Object[]> countUsersPerRole();

//enabled previous admin

}