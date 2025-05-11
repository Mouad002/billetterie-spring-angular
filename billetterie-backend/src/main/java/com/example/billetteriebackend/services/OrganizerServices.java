package com.example.billetteriebackend.services;

import com.example.billetteriebackend.dtos.CategoryDTO;
import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.exceptions.EventNotFoundException;

import java.util.List;

public interface OrganizerServices {

    EventDTO saveEvent(EventDTO eventDTO);
    List<EventDTO> listEvents();
    EventDTO getEvent(Long id) throws EventNotFoundException;
    EventDTO updateEvent(EventDTO eventDTO);
    void deleteEvents(Long id);
    List<EventDTO> searchEvents(String keyword);
    CategoryDTO saveCategory(CategoryDTO categoryDTO);
}
