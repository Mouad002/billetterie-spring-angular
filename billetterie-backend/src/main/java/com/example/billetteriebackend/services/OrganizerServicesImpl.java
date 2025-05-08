package com.example.billetteriebackend.services;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.entities.Event;
import com.example.billetteriebackend.exceptions.EventNotFoundException;
import com.example.billetteriebackend.mappers.BilletterieMapperImpl;
import com.example.billetteriebackend.repositories.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class OrganizerServicesImpl implements OrganizerServices {

    private EventRepository eventRepository;
    private BilletterieMapperImpl dtoMapper;

    @Override
    public EventDTO saveEvent(EventDTO eventDTO) {
        Event event = dtoMapper.fromEventDTO(eventDTO);
        Event savedEvent = eventRepository.save(event);
        return dtoMapper.fromEvent(savedEvent);
    }

    @Override
    public List<EventDTO> listEvents() {

        List<Event> events = eventRepository.findAll();
        List<EventDTO> eventDTOS = events.stream().map(event -> dtoMapper.fromEvent(event)).collect(Collectors.toList());
        return eventDTOS;
    }

    @Override
    public EventDTO getEvent(Long id) throws EventNotFoundException {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found"));
        return dtoMapper.fromEvent(event);
    }

    @Override
    public EventDTO updateEvent(EventDTO eventDTO) {
        Event event =dtoMapper.fromEventDTO(eventDTO);
        Event updatedEvent = eventRepository.save(event);
        return dtoMapper.fromEvent(updatedEvent);
    }

    @Override
    public void deleteEvents(Long id) {
        eventRepository.deleteById(id);
    }

    @Override
    public List<EventDTO> searchEvents(String keyword) {
        List<Event> events = eventRepository.findByTitleContains(keyword);
        List<EventDTO> eventDTOS = events.stream().map(event -> dtoMapper.fromEvent(event)).collect(Collectors.toList());
        return eventDTOS;
    }
}
