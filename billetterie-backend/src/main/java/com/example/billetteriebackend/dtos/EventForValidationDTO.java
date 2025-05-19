package com.example.billetteriebackend.dtos;

import com.example.billetteriebackend.entities.Status;
import lombok.Data;

import java.util.Date;

@Data
public class EventForValidationDTO {

    private Long id;
    private String title;
    private String description;
    private String location;
    private String image;
    private Status status;
    private Date dateEvent;
    private Date heure;
    private String category;
    private String organizer;

}
