package com.example.billetteriebackend.services;

import com.example.billetteriebackend.entities.TicketTypeAllocation;

import java.util.List;

public interface TicketService {


    TicketTypeAllocation getTicketType(Long ticketTypeId);

    List<TicketTypeAllocation> listTicketTypes();
    List<TicketTypeAllocation> listTicketTypesByEventID(Long eventId);
}
