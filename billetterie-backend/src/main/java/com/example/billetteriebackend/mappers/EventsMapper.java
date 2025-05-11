package com.example.billetteriebackend.mappers;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.entities.Event;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class EventsMapper {

    public EventDTO fromEvent(Event event) {
        EventDTO eventDTO=new EventDTO();
        BeanUtils.copyProperties(event,eventDTO);
        return  eventDTO;
    }

    public Event fromEventDTO(EventDTO eventDTO){
        Event event=new Event();
        BeanUtils.copyProperties(eventDTO,event);
        return  event;
    }
}
