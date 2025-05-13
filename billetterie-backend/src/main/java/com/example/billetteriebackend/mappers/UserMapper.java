package com.example.billetteriebackend.mappers;

import com.example.billetteriebackend.dtos.UserForManagingDTO;
import com.example.billetteriebackend.entities.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    public UserForManagingDTO getUserForManagingDtoFromUser(User user) {
        UserForManagingDTO userForManagingDTO = new UserForManagingDTO();
        BeanUtils.copyProperties(user, userForManagingDTO);
        return userForManagingDTO;
    }
}
