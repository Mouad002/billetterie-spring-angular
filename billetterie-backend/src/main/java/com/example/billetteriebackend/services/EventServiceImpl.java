package com.example.billetteriebackend.services;

import com.example.billetteriebackend.dtos.*;
import com.example.billetteriebackend.entities.Category;
import com.example.billetteriebackend.entities.Event;
import com.example.billetteriebackend.entities.Status;
import com.example.billetteriebackend.entities.Ticket;
import com.example.billetteriebackend.exceptions.EventNotFoundException;
import com.example.billetteriebackend.exceptions.StringToEnumConversionException;
import com.example.billetteriebackend.helpers.ResponseApi;
import com.example.billetteriebackend.helpers.StringToEnumConverter;
import com.example.billetteriebackend.mappers.BilletterieMapperImpl;
import com.example.billetteriebackend.mappers.EventMapper;
import com.example.billetteriebackend.mappers.EventsMapper;
import com.example.billetteriebackend.repositories.EventRepository;
import com.example.billetteriebackend.repositories.TicketRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class EventServiceImpl implements EventService {
    private EventRepository eventRepository;
    private TicketRepository ticketRepository;
    private EventMapper eventMapper;


    @Override
    public List<EventDTO> listEvents() {

        List<Event> events = eventRepository.findAll();
        List<EventDTO> eventDTOS = events.stream().map(event -> eventMapper.fromEvent(event)).collect(Collectors.toList());
        return eventDTOS;
    }

    @Override
    public EventDTO getEvent(Long id) throws EventNotFoundException {
        Event event = eventRepository.findById(id).orElseThrow(() -> new EventNotFoundException("Event not found"));
        return eventMapper.fromEvent(event);
    }


    @Override
    public ResponseApi<EventForValidationDTO> getEventsForValidation(int page, int size) {
        Page<Event> eventPage = eventRepository.findAll(PageRequest.of(page, size));
        ResponseApi<EventForValidationDTO> response = new ResponseApi<EventForValidationDTO>();
        BeanUtils.copyProperties(eventPage, response);
        response.setContent(eventPage.getContent().stream().map(event -> eventMapper.eventForValidationDtoFromEvent(event)).collect(Collectors.toList()));
        return response;
    }

    @Override
    public ResponseMessageDTO changeEventStatus(ChangeEventStatusRequestDTO e) {
        // verify the event
        Event event = eventRepository.findById(e.getId()).orElse(null);
        // if the user does not exist return message error
        if(event == null) {
            return ResponseMessageDTO.builder()
                    .message("event {\"+e.getId()+\"} not found")
                    .status(500)
                    .build();
        }
        Status newStatus;
        // invoke the class converter from string to enum
        StringToEnumConverter<Status> statusConverter = new StringToEnumConverter<Status>(Status.class);
        try {
            // convert the string to EventStatus
            newStatus = statusConverter.convert(e.getStatus());
        } catch (StringToEnumConversionException ex) {
            // error in case of unfounded status
            return ResponseMessageDTO.builder()
                    .message("status "+ e.getStatus() + " can't be found")
                    .status(500)
                    .build();
        }
        // if the user has already the new status throw error 500
        if( event.getStatus() == newStatus ) {
            return ResponseMessageDTO.builder()
                    .message("Event "+ e.getId()+" has already status "+e.getStatus())
                    .status(500)
                    .build();
        } else {
            eventRepository.updateEventStatus(e.getId(), newStatus);
            return ResponseMessageDTO.builder()
                    .message("status of event "+ e.getId()+" has changed successfully")
                    .status(200)
                    .build();
        }
    }

    @Override
    public ResponseMessageDTO deleteEvent(Long id) {
        // get the ticket of the event and check if there are sold ticke,
        // in that case we forbid the operation
        List<Ticket> ticketList = ticketRepository.findAllByEventId(id);
        for(Ticket t:ticketList) {
            if(t.getUser() != null)
                return ResponseMessageDTO.builder()
                        .status(500)
                        .message("There is a ticket in the event "+ id +" already sold!")
                        .build();
        }
        // delete all the tickets then the event
        try {
            for(Ticket t:ticketList) {
                ticketRepository.delete(t);
            }
            eventRepository.deleteById(id);
            return ResponseMessageDTO.builder()
                    .status(200)
                    .message("Event "+id+" deleted successfully")
                    .build();
        } catch (Exception e) {
            return ResponseMessageDTO.builder()
                    .status(500)
                    .message(e.getMessage())
                    .build();
        }
    }

    @Override
    public ResponseApi<EventForManagingDTO> getEventsForManaging(int page, int size) {
        Page<Event> eventsPage = eventRepository.findAllByOrderByDateEventDesc(PageRequest.of(page, size));
        List<EventForManagingDTO> content = eventsPage.stream().map(event -> eventMapper.eventForManagingDtofromEvent(event)).collect(Collectors.toList());
        ResponseApi<EventForManagingDTO> response = new ResponseApi<EventForManagingDTO>();
        BeanUtils.copyProperties(eventsPage, response);
        response.setContent(content);
        return response;
    }














    @Override
    public Page<EventDTO> listEvents(String status,Pageable pageable) {
        Status s =Status.valueOf(status);
        Page<Event> eventsPage = eventRepository.findAllByStatus(s,pageable);
        return eventsPage.map(eventMapper::fromEvent);
    }






    @Override
    public EventDTO saveEvent(EventDTO customerDTO) {

        Event customer=eventMapper.fromEventDTO(customerDTO);
        Event savedCustomer = eventRepository.save(customer);
        return eventMapper.fromEvent(savedCustomer);
    }







    @Override
    public Page<EventDTO> searchEvents(String keyword,Pageable pageable) {
        Page<Event> events=eventRepository.findByTitleContains(keyword,pageable);
        return events.map(eventMapper::fromEvent);
    }




    @Override
    public List<EventDTO> getEventsByCategory(String categoryStr) {
        Category category;
        try {
            category = Category.valueOf(categoryStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Catégorie invalide : " + categoryStr);
        }

        List<Event> events = eventRepository.findByCategory(category);
        return events.stream().map(eventMapper::fromEvent).collect(Collectors.toList());
    }
}
