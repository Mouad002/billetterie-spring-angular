package com.example.billetteriebackend.web;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.services.EventService;
import com.example.billetteriebackend.services.OrganizerServices;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@Slf4j
public class HomeRestController {
    private OrganizerServices organizerServices;
    private EventService eventService;

    @GetMapping("/home")
    public Page<EventDTO> events(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "2") int size){

        Pageable pageable = PageRequest.of(page, size);
        return eventService.listEvents(pageable);
    }



    @GetMapping("/home/search")
    public Page<EventDTO> searchEvent(
            @RequestParam(name = "keyword", defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size

    ){
        Pageable pageable = PageRequest.of(page, size);
        return eventService.searchEvents(keyword, pageable);
    }


















    @GetMapping("/home/searchByCat")
    public ResponseEntity<List<EventDTO>> searchCatEvents(@RequestParam(name = "category", defaultValue = "") String category) {
        try {
            if (category.isEmpty()) {
                return ResponseEntity.ok(List.of());
            }
            List<EventDTO> events = eventService.getEventsByCategory(category);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            log.error("Error processing searchByCat with category: {}", category, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(List.of());
        }
    }
}


