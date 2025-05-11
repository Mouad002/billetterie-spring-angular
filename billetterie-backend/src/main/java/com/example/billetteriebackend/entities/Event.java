package com.example.billetteriebackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor
public class Event {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String location;
    private String image;
    private Date dateEvent;
    private Category category;

    @Enumerated(EnumType.STRING)
    private Status status;


    @ManyToOne
    private Organizer organizer;
    @OneToMany(mappedBy = "event")
    private List<Ticket> tickets;
}
