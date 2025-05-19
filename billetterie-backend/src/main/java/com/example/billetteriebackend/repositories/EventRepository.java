package com.example.billetteriebackend.repositories;

import com.example.billetteriebackend.entities.Category;
import com.example.billetteriebackend.entities.Event;
import com.example.billetteriebackend.entities.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByTitleContains(String keyword);

    @Modifying
    @Query("update Event e set e.status = :s where e.id = :id")
    void updateEventStatus(@Param("id") Long id, @Param("s") Status status);

    Page<Event> findAllByOrderByDateEventDesc(PageRequest p);




    Page<Event> findAll(Pageable pageable);
    Page<Event> findByTitleContains(String keyword,Pageable pageable);


    @Query("select c from Event c where c.title like :kw")
    List<Event> searchEvent(@Param("kw") String keyword);


    List<Event> findByCategory(Category category);
}
