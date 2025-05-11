package com.example.billetteriebackend.dtos;

import com.example.billetteriebackend.entities.Category;
import com.example.billetteriebackend.entities.Status;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class EventDTO {

    private Long id;
    private String title;
    private String description;
    private String location;
    private String image;
    private Category category;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateEvent;

    @Temporal(TemporalType.TIME)
    @DateTimeFormat(pattern = "HH:mm")
    private Date heure;

    @Enumerated(EnumType.STRING)
    private Status status;


}
