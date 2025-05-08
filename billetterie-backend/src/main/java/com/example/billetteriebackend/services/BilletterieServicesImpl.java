package com.example.billetteriebackend.services;

import com.example.billetteriebackend.entities.Event;
import com.example.billetteriebackend.exceptions.EventNotFoundException;
import com.example.billetteriebackend.repositories.EventRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class BilletterieServicesImpl implements BilletterieServices {

    private EventRepository eventRepository;

    @Override
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> listEvents() {
        List<Event> events = eventRepository.findAll();
        return events;
    }

    @Override
    public Event getEvent(Long id) throws EventNotFoundException {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found"));
        return event;
    }

    @Override
    public Event updateEvent(Event event) {

        return null;
    }

    @Override
    public void deleteEvents(Long id) {

    }

    @Override
    public List<Event> searchEvents(String keyword) {
        return List.of();
    }
}
