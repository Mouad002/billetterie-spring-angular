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
    private int maxTickets;
    private Category category;


    private Status status;


    private Date startDate;


    private Date endDate;



}
