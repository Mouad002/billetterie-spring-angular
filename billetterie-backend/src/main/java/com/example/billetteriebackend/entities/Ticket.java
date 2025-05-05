package com.example.billetteriebackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor
public class Ticket {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String eventId;
    private String userId;
    private String seatNumber;
    private double price;
    private Date reservationDate;


}
