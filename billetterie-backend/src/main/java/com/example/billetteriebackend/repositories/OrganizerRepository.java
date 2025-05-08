package com.example.billetteriebackend.repositories;

import com.example.billetteriebackend.entities.Organizer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizerRepository extends JpaRepository<Organizer, Long> {
}
