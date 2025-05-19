package com.example.billetteriebackend.web;

import com.example.billetteriebackend.entities.TicketTypeAllocation;
import com.example.billetteriebackend.services.OrganizerServices;
import com.example.billetteriebackend.services.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class TicketRestController {
    private OrganizerServices organizerServices;
    private TicketService ticketService;
    @PostMapping("/ticketType")
    public TicketTypeAllocation saveTicketType(@RequestBody TicketTypeAllocation ticketTypeAllocation){
        return organizerServices.saveTicketType(ticketTypeAllocation);
    }
    @GetMapping("/ticketTypeList")
    List<TicketTypeAllocation> listTicketTypes(){
        return ticketService.listTicketTypes();
    }
    @GetMapping("/ticketTypeList/{eventId}")
    List<TicketTypeAllocation> listTicketTypesByEventID(@PathVariable Long eventId){
        return ticketService.listTicketTypesByEventID(eventId);
    }
}
