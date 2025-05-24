package com.example.billetteriebackend.dtos;

import com.example.billetteriebackend.entities.Category;
import com.example.billetteriebackend.entities.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
public class EventDTO {

    private Long id;
    private String title;
    private String description;
    private String location;
    private String image;

    @Enumerated(EnumType.STRING)
    private Category category;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateEvent;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private Date heure;

    @Enumerated(EnumType.STRING)
    private Status status;
    private  double price;
    private int currentPage;
    private int totalPages;
    private int pageSize;

}
