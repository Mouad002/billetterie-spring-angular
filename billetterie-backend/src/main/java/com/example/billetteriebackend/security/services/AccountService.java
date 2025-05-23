package com.example.billetteriebackend.security.services;


import com.example.billetteriebackend.entities.Role;
import com.example.billetteriebackend.entities.AppUser;

public interface AccountService {
    AppUser addNewUser(String username, String password, String confirmPassword, String email);
    Role addNewRole(String role);
    void addRoleToUser(String username, String role);
    void removeRoleFromUser(String username, String role);
    AppUser loadUserByUsername(String username);
}