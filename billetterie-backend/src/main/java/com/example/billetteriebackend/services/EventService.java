package com.example.billetteriebackend.services;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.entities.Ticket;
import org.springframework.stereotype.Service;

import java.util.List;

public interface EventService {
    List<EventDTO> listEvents();


}
