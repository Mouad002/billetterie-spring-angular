package com.example.billetteriebackend.repositories;

import com.example.billetteriebackend.entities.TicketTypeAllocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketTypeRepository extends JpaRepository<TicketTypeAllocation, Long> {
    List<TicketTypeAllocation> findTicketTypeAllocationByEvent_Id(Long eventId);
}
