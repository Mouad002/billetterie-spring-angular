package com.example.billetteriebackend.services;

import com.example.billetteriebackend.dtos.*;
import com.example.billetteriebackend.exceptions.EventNotFoundException;
import com.example.billetteriebackend.exceptions.StringToEnumConversionException;
import com.example.billetteriebackend.helpers.ResponseApi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EventService {
    List<EventDTO> listEvents();
    EventDTO getEvent(Long id) throws EventNotFoundException;

    ResponseApi<EventForValidationDTO> getEventsForValidation(int page, int size);

    ResponseMessageDTO changeEventStatus(ChangeEventStatusRequestDTO e);

    ResponseMessageDTO deleteEvent(Long id);

    ResponseApi<EventForManagingDTO> getEventsForManaging(int page, int size);
    Page<EventDTO> listEvents(Pageable pageable) ;
    EventDTO saveEvent(EventDTO eventDTO);
    Page<EventDTO> searchEvents(String keyword,Pageable pageable) ;




















    List<EventDTO> getEventsByCategory(String category);

}
