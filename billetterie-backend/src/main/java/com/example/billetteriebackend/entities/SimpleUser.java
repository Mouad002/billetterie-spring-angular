package com.example.billetteriebackend.entities;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@DiscriminatorValue("SIMPLE_USER")
public class SimpleUser extends AppUser {

}
