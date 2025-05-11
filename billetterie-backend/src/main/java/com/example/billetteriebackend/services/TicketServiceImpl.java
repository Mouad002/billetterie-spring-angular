package com.example.billetteriebackend.services;

import com.example.billetteriebackend.entities.TicketTypeAllocation;
import com.example.billetteriebackend.repositories.TicketTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@AllArgsConstructor
public class TicketServiceImpl implements TicketService{
    private TicketTypeRepository ticketTypeRepository;
    @Override
    public TicketTypeAllocation getTicketType(Long ticketTypeId) {
        TicketTypeAllocation ticketType = ticketTypeRepository.findById(ticketTypeId).orElse(null);
        return ticketType;
    }

    @Override
    public List<TicketTypeAllocation> listTicketTypes() {
        return ticketTypeRepository.findAll();
    }

    @Override
    public List<TicketTypeAllocation> listTicketTypesByEventID(Long eventId) {
        return ticketTypeRepository.findTicketTypeAllocationByEvent_Id(eventId);
    }
}
