package com.example.billetteriebackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseMessageDTO {
    private int status;
    private String message;
}
