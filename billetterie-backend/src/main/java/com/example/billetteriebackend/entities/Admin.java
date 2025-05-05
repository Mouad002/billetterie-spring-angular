package com.example.billetteriebackend.entities;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@DiscriminatorValue("ORGANIZER")
@AllArgsConstructor
@NoArgsConstructor

public class Admin extends User {
}
