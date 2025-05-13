package com.example.billetteriebackend.services;

import com.example.billetteriebackend.dtos.ResponseMessageDTO;
import com.example.billetteriebackend.dtos.UpdateUserStatusDTO;
import com.example.billetteriebackend.dtos.UserForManagingDTO;
import com.example.billetteriebackend.entities.Status;
import com.example.billetteriebackend.entities.Ticket;
import com.example.billetteriebackend.entities.User;
import com.example.billetteriebackend.entities.UserStatus;
import com.example.billetteriebackend.exceptions.StringToEnumConversionException;
import com.example.billetteriebackend.helpers.ResponseApi;
import com.example.billetteriebackend.helpers.StringToEnumConverter;
import com.example.billetteriebackend.mappers.UserMapper;
import com.example.billetteriebackend.repositories.TicketRepository;
import com.example.billetteriebackend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Transactional
@Service
public class UserServiceImp implements UserService{
    private UserRepository userRepository;
    private UserMapper userMapper;
    private TicketRepository ticketRepository;

    @Override
    public ResponseApi<UserForManagingDTO> getUsersForManaging(int page, int size) {
        Page<User> usersPage = userRepository.findAll(PageRequest.of(page, size));
        ResponseApi<UserForManagingDTO> response = new ResponseApi<>();
        BeanUtils.copyProperties(usersPage, response);
        List<UserForManagingDTO> content = usersPage.getContent().stream().map(user -> userMapper.getUserForManagingDtoFromUser(user)).collect(Collectors.toList());
        response.setContent(content);
        return response;
    }

    @Override
    public ResponseMessageDTO changeUserStatus(UpdateUserStatusDTO dto) {
        User currentUser = userRepository.findById(dto.getId()).orElse(null);

        if(currentUser == null) {
            return ResponseMessageDTO.builder()
                    .status(500)
                    .message("user "+dto.getId()+" not found")
                    .build();
        }

        StringToEnumConverter<UserStatus> statusConverter = new StringToEnumConverter<UserStatus>(UserStatus.class);
        UserStatus newStatus;
        try {
            newStatus = statusConverter.convert(dto.getStatus());
        } catch (StringToEnumConversionException ex) {
            // error in case of unfounded status
            return ResponseMessageDTO.builder()
                    .message("Status "+ dto.getStatus() + " can't be found")
                    .status(500)
                    .build();
        }
        if (currentUser.getUserStatus() == newStatus ) {
            return ResponseMessageDTO.builder()
                    .message("User "+ dto.getId()+" has already status "+newStatus)
                    .status(500)
                    .build();
        } else {
            // update the user status
            userRepository.updateById(dto.getId(), newStatus);
            return ResponseMessageDTO.builder()
                    .message("Status of user "+ dto.getId()+" has changed successfully")
                    .status(200)
                    .build();
        }
    }

    @Override
    public ResponseMessageDTO deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return ResponseMessageDTO.builder()
                    .status(200)
                    .message("User "+id+" deleted successfully")
                    .build();
        } catch (Exception e) {
            return ResponseMessageDTO.builder()
                    .status(500)
                    .message(e.getMessage())
                    .build();
        }
    }
}
