package com.example.billetteriebackend.web;

import com.example.billetteriebackend.dtos.*;
import com.example.billetteriebackend.exceptions.StringToEnumConversionException;
import com.example.billetteriebackend.helpers.ResponseApi;
import com.example.billetteriebackend.repositories.TicketRepository;
import com.example.billetteriebackend.services.EventService;
import com.example.billetteriebackend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class AdminRestController {
    private EventService eventService;
    private UserService userService;
    private TicketRepository ticketRepository;

    @GetMapping("/admin/events-evaluation")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")

    public ResponseApi<EventForValidationDTO> getEventsForValidation(@RequestParam(name="page", defaultValue = "0") int page,
                                                                     @RequestParam(name="size", defaultValue = "10") int size)
    {
        return eventService.getEventsForValidation(page, size);
    }

    @PutMapping("/admin/changing-event-status")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")

    public ResponseMessageDTO eventEvaluation(@RequestBody ChangeEventStatusRequestDTO e) throws StringToEnumConversionException
    {
        return eventService.changeEventStatus(e);
    }

    @GetMapping("/admin/users-for-managing")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")

    public ResponseApi<UserForManagingDTO> getUsersForManaging(@RequestParam(name="page", defaultValue = "0") int page,
                                                               @RequestParam(name="size", defaultValue = "10") int size) {
        return userService.getUsersForManaging(page, size);
    }

    @GetMapping("/admin/events-for-managing")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")

    public ResponseApi<EventForManagingDTO> getEventsForManaging(@RequestParam(name="page", defaultValue = "0") int page,
                                                                 @RequestParam(name="size", defaultValue = "10") int size) {
        return eventService.getEventsForManaging(page, size);
    }

    @DeleteMapping("/admin/delete-event")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")

    public ResponseMessageDTO deleteEvent(@RequestBody LongRequestDTO dto)
    {
        return eventService.deleteEvent(dto.getId());
    }

    @PutMapping("/admin/block-user")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")

    public ResponseMessageDTO blockUser(@RequestBody UpdateUserStatusDTO updateUserStatusDTO)
    {
        return userService.changeUserStatus(updateUserStatusDTO);
    }

//    @DeleteMapping("/admin/delete-user")
//    public ResponseMessageDTO deleteUser(@RequestBody LongRequestDTO dto)
//    {
//        return userService.deleteUser(dto.getId());
//    }

    @GetMapping("/admin/test")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")

    public Object test() {
        return ticketRepository.findAllByEventId(1L);
    }
}
