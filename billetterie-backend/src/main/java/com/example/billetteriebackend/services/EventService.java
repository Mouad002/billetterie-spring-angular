package com.example.billetteriebackend.services;

import com.example.billetteriebackend.dtos.*;
import com.example.billetteriebackend.exceptions.EventNotFoundException;
import com.example.billetteriebackend.exceptions.StringToEnumConversionException;
import com.example.billetteriebackend.helpers.ResponseApi;

import java.util.List;

public interface EventService {
    List<EventDTO> listEvents();
    EventDTO getEvent(Long id) throws EventNotFoundException;

    ResponseApi<EventForValidationDTO> getEventsForValidation(int page, int size);

    ResponseMessageDTO changeEventStatus(ChangeEventStatusRequestDTO e);

    ResponseMessageDTO deleteEvent(Long id);

    ResponseApi<EventForManagingDTO> getEventsForManaging(int page, int size);

}
