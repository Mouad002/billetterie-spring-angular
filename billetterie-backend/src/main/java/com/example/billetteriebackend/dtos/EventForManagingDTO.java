package com.example.billetteriebackend.dtos;

import com.example.billetteriebackend.entities.Status;
import lombok.Data;

import java.util.Date;

@Data
public class EventForManagingDTO {

    private Long id;
    private String title;
    private String description;
    private String location;
    private String image;

    private Status status;

    private Date startDate;
    private Date endDate;

    private String category;

    private String organizer;
    private Date createdAt;
}
