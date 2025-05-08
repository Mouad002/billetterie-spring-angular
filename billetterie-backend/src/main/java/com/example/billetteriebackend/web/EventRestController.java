package com.example.billetteriebackend.web;


import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.exceptions.EventNotFoundException;
import com.example.billetteriebackend.services.OrganizerServices;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class EventRestController {

    private OrganizerServices organizerServices;

    @GetMapping("/events")
    public List<EventDTO> events(){

        return organizerServices.listEvents();
    }

    @GetMapping("/events/{id}")
    public EventDTO getEvent(@PathVariable(name = "id") Long eventId)throws EventNotFoundException {
        return organizerServices.getEvent(eventId);
    }

    @PostMapping("/events")
    public EventDTO saveEvent(@RequestBody EventDTO eventDTO){
        return organizerServices.saveEvent(eventDTO);
    }

    @PutMapping("/events/{eventId}")
    public EventDTO updateEvent(@PathVariable Long eventId,@RequestBody EventDTO eventDTO){
        eventDTO.setId(eventId);
        return organizerServices.updateEvent(eventDTO);
    }

    @GetMapping("/events/search")
    public List<EventDTO> searchEvent(@RequestParam(name = "keyword", defaultValue = "") String keyword){
        return organizerServices.searchEvents(keyword);
    }
}
