package com.example.billetteriebackend.dtos;

import lombok.Data;

@Data
public class UpdateUserStatusDTO {
    private Long id;
    private String status;
}
