package com.example.billetteriebackend.services;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.entities.Event;
import com.example.billetteriebackend.mappers.BilletterieMapperImpl;
import com.example.billetteriebackend.mappers.EventsMapper;
import com.example.billetteriebackend.repositories.EventRepository;

import java.util.List;
import java.util.stream.Collectors;

public class EventServiceImpl implements EventService {
    private EventRepository eventRepository;
    private EventsMapper dtoMapper;
        @Override
        public List<EventDTO> listEvents() {

            List<Event> events = eventRepository.findAll();
            List<EventDTO> eventDTOS = events.stream().map(event -> dtoMapper.fromEvent(event)).collect(Collectors.toList());
            return eventDTOS;
        }

}
