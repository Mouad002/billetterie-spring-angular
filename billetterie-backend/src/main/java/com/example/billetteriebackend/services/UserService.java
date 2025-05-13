package com.example.billetteriebackend.services;

import com.example.billetteriebackend.dtos.ResponseMessageDTO;
import com.example.billetteriebackend.dtos.UpdateUserStatusDTO;
import com.example.billetteriebackend.dtos.UserForManagingDTO;
import com.example.billetteriebackend.helpers.ResponseApi;

public interface UserService {
    ResponseApi<UserForManagingDTO> getUsersForManaging(int page, int size);

    ResponseMessageDTO changeUserStatus(UpdateUserStatusDTO updateUserStatusDTO);

    ResponseMessageDTO deleteUser(Long id);
}
