package com.example.billetteriebackend.mappers;

import com.example.billetteriebackend.dtos.UserForManagingDTO;
import com.example.billetteriebackend.entities.AppUser;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    public UserForManagingDTO getUserForManagingDtoFromUser(AppUser user) {
        UserForManagingDTO userForManagingDTO = new UserForManagingDTO();
        BeanUtils.copyProperties(user, userForManagingDTO);
        return userForManagingDTO;
    }
}
