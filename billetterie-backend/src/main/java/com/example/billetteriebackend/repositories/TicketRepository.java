package com.example.billetteriebackend.repositories;

import com.example.billetteriebackend.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
