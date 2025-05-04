package com.example.billetteriebackend.entities;

import java.util.Date;

public class Event {
    private String id;
    private String title;
    private String description;
    private String location;
    private Date startDate;
    private Date endDate;
    private Category category;
    private Status status;
    private Organizer organizer;
}
