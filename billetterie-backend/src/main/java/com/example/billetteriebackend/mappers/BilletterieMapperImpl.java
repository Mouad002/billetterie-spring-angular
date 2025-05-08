package com.example.billetteriebackend.mappers;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.dtos.OrganizerDTO;
import com.example.billetteriebackend.dtos.UserDTO;
import com.example.billetteriebackend.entities.Event;
import com.example.billetteriebackend.entities.Organizer;
import com.example.billetteriebackend.entities.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class BilletterieMapperImpl {

    // *****************************************************************************
    public EventDTO fromEvent(Event event) {
        EventDTO eventDTO = new EventDTO();
        BeanUtils.copyProperties(event, eventDTO);
        return eventDTO;
    }

    public Event fromEventDTO(EventDTO eventDTO) {
        Event event = new Event();
        BeanUtils.copyProperties(eventDTO, event);
        return event;
    }

    // *****************************************************************************

    public OrganizerDTO fromOrganizer(Organizer organizer) {
        OrganizerDTO organizerDTO = new OrganizerDTO();
        BeanUtils.copyProperties(organizer, organizerDTO);
        return organizerDTO;
    }

    public Organizer fromOrganizerDTO(OrganizerDTO organizerDTO) {
        Organizer organizer = new Organizer();
        BeanUtils.copyProperties(organizer, organizerDTO);
        return organizer;
    }

    // *****************************************************************************

}
