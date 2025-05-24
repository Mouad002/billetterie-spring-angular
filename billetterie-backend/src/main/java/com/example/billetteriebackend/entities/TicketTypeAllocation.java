package com.example.billetteriebackend.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Getter
@Setter
public class TicketTypeAllocation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private TicketType ticketType;
    @ManyToOne
    @JoinColumn(name = "event_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Event event;
    private int maxQuantity;
    private String description;
    private double price;
}
