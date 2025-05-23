package com.example.billetteriebackend.security.services;



import com.example.billetteriebackend.entities.Role;
import com.example.billetteriebackend.entities.AppUser;
import com.example.billetteriebackend.repositories.RoleRepository;
import com.example.billetteriebackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {
    private UserRepository appUserRepository;
    private RoleRepository appRoleRepository;
    private PasswordEncoder passwordEncoder;
    @Override
    public AppUser addNewUser(String username, String password, String confirmPassword, String email) {
        AppUser user = appUserRepository.findByUsername(username);
        if (user != null) throw new RuntimeException("user already exists");
        if (!password.equals(confirmPassword)) throw  new RuntimeException("passwords not much");
        AppUser newUser = AppUser.builder()

                .username(username)
                .password(passwordEncoder.encode(password))
                .email(email)
                .build();
        AppUser savedUser = appUserRepository.save(newUser);
        return savedUser;
    }

    @Override
    public Role addNewRole(String role) {
        Role appRole = appRoleRepository.findById(role).orElse(null);
        if (appRole != null) throw new RuntimeException("role already exists");
        return appRoleRepository.save(Role.builder().role(role).build());
    }

    @Override
    public void addRoleToUser(String username, String role) {
        AppUser appUser = appUserRepository.findByUsername(username);
        Role appRole = appRoleRepository.findById(role).get();
        appUser.getRoles().add(appRole);
//        appUserRepository.save(appUser);
    }

    @Override
    public void removeRoleFromUser(String username, String role) {
        AppUser appUser = appUserRepository.findByUsername(username);
        Role appRole = appRoleRepository.findById(role).get();
        appUser.getRoles().remove(appRole);
    }

    @Override
    public AppUser loadUserByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }
}
