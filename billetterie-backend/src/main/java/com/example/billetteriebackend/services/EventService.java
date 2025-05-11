package com.example.billetteriebackend.services;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.entities.Ticket;
import com.example.billetteriebackend.exceptions.EventNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

public interface EventService {
    List<EventDTO> listEvents();
    EventDTO getEvent(Long id) throws EventNotFoundException;


}
