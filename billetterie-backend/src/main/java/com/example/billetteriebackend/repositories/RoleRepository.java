package com.example.billetteriebackend.repositories;

import com.example.billetteriebackend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {
}
