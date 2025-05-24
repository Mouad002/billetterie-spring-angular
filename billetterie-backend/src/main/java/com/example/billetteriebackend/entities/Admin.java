package com.example.billetteriebackend.entities;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("ADMIN")
@AllArgsConstructor

public class Admin extends AppUser {
}
