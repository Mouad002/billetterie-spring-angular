package com.example.billetteriebackend.repositories;

import com.example.billetteriebackend.entities.Category;
import com.example.billetteriebackend.entities.Event;
import com.example.billetteriebackend.entities.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByTitleContains(String keyword);
    List<Event> findByCategory(Category category);

    @Modifying
    @Query("update Event e set e.status = :s where e.id = :id")
    void updateEventStatus(@Param("id") Long id, @Param("s") Status status);

    Page<Event> findAllByOrderByDateEventDesc(PageRequest p);
}
