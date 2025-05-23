package com.example.billetteriebackend.repositories;

import com.example.billetteriebackend.entities.Role;
import com.example.billetteriebackend.entities.AppUser;
import com.example.billetteriebackend.entities.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    Page<AppUser> findAllByRolesNotContains(Role r, PageRequest p);

    @Modifying
    @Query("update AppUser u set u.userStatus = :s where u.id = :id")
    void updateById(Long id, UserStatus s);


    AppUser findByUsername(String username);
}
