package com.example.billetteriebackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChangeEventStatusRequestDTO {
    private Long id;
    private String status;
}
