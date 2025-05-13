package com.example.billetteriebackend.entities;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor
@DiscriminatorValue("ORGANIZER")
public class Organizer extends User {

    @OneToMany(mappedBy = "organizer", fetch = FetchType.LAZY)
    private List<Event> events;
}
