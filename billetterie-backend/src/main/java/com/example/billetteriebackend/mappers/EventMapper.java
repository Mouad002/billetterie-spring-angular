package com.example.billetteriebackend.mappers;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.dtos.EventForManagingDTO;
import com.example.billetteriebackend.dtos.EventForValidationDTO;
import com.example.billetteriebackend.entities.Event;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class EventMapper {
    public EventForValidationDTO fromEvent(Event event) {
        EventForValidationDTO eventForValidationDTO = new EventForValidationDTO();
        BeanUtils.copyProperties(event, eventForValidationDTO);
        eventForValidationDTO.setCategory(event.getCategory().toString());
        eventForValidationDTO.setOrganizer(event.getOrganizer().getFullName());
        return eventForValidationDTO;
    }

    public EventDTO eventDtoFromEvent(Event event) {
        EventDTO eventDTO = new EventDTO();
        BeanUtils.copyProperties(event, eventDTO);
        return eventDTO;
    }

    public EventForManagingDTO eventForManagingDtofromEvent(Event event) {
        EventForManagingDTO eventForManagingDTO = new EventForManagingDTO();
        BeanUtils.copyProperties(event, eventForManagingDTO);
        eventForManagingDTO.setCategory(event.getCategory().toString());
        eventForManagingDTO.setOrganizer(event.getOrganizer().getFullName());
        return eventForManagingDTO;
    }
}
