package com.example.billetteriebackend.repositories;

import com.example.billetteriebackend.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findAllByEventId(Long id);
}
