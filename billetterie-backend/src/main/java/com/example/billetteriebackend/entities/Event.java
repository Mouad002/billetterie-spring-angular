package com.example.billetteriebackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor
public class Event {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String title;
    private String description;
    private String location;
    private Date startDate;
    private Date endDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    private Category category;
    @ManyToOne
    private Organizer organizer;
}
