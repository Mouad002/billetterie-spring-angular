package com.example.billetteriebackend.repositories;

import com.example.billetteriebackend.entities.Category;
import com.example.billetteriebackend.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByTitleContains(String keyword);
    List<Event> findByCategoryId(Long categoryId);
}
