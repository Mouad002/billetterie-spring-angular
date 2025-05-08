package com.example.billetteriebackend.services;

import com.example.billetteriebackend.entities.Event;
import com.example.billetteriebackend.exceptions.EventNotFoundException;

import java.util.List;

public interface BilletterieServices {

    Event saveEvent(Event event);
    List<Event> listEvents();
    Event getEvent(Long id) throws EventNotFoundException;
    Event updateEvent(Event event);
    void deleteEvents(Long id);
    List<Event> searchEvents(String keyword);
}
