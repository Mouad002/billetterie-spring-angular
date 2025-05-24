package com.example.billetteriebackend.dtos;

import com.example.billetteriebackend.entities.Event;
import com.example.billetteriebackend.entities.TicketType;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class TicketTypeDTO {
    private Long id;
    @Enumerated(EnumType.STRING)
    private TicketType ticketType;
    private EventDTO eventDTO;
    private int maxQuantity;
    private double price;
}
