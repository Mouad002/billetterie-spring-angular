package com.example.billetteriebackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Data
@AllArgsConstructor @NoArgsConstructor
@DiscriminatorColumn(name = "user_type", length = 16, discriminatorType = DiscriminatorType.STRING)
public abstract class User {

    @Id
    private String id;
    private String fullName;
    private String username;
    private String password;
    private String email;
    private String tel;

    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
    private List<Role> roles;
}
