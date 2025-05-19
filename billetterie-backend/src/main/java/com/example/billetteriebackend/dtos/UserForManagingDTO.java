package com.example.billetteriebackend.dtos;

import lombok.Data;

@Data
public class UserForManagingDTO {
    private Long id;
    private String fullName;
    private String username;
    private String password;
    private String email;
    private String tel;
    private String roles;
}
