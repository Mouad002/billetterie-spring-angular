package com.example.billetteriebackend.web;


import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.entities.TicketTypeAllocation;
import com.example.billetteriebackend.exceptions.EventNotFoundException;
import com.example.billetteriebackend.services.OrganizerServices;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin("*")
@RestController
@AllArgsConstructor

public class EventRestController {

    private OrganizerServices organizerServices;

    @GetMapping("/organizer/events")
    public List<EventDTO> events(){

        return organizerServices.listEvents();
    }

    @GetMapping("/organizer/events/{id}")
    public EventDTO getEvent(@PathVariable(name = "id") Long eventId)throws EventNotFoundException {
        return organizerServices.getEvent(eventId);
    }

    @PostMapping("/organizer/events")
    public EventDTO saveEvent(@RequestBody EventDTO eventDTO){
        return organizerServices.saveEvent(eventDTO);
    }

    @PutMapping("/organizer/events/{eventId}")
    public EventDTO updateEvent(@PathVariable Long eventId, @RequestBody EventDTO eventDTO) {
        System.out.println("EventDTO reçu : " + eventDTO); // debug
        eventDTO.setId(eventId);
        return organizerServices.updateEvent(eventDTO);
    }

    @GetMapping("/organizer/events/search")
    public List<EventDTO> searchEvent(@RequestParam(name = "keyword", defaultValue = "") String keyword){
        return organizerServices.searchEvents(keyword);
    }
    @PostMapping("/organizer/events/ticketType")
    public TicketTypeAllocation saveTicketType(@RequestBody TicketTypeAllocation ticketTypeAllocation) throws EventNotFoundException {
        return organizerServices.saveTicketType(ticketTypeAllocation);
    }




















}
