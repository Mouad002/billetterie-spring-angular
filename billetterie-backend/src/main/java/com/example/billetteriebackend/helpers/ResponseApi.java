package com.example.billetteriebackend.helpers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseApi<T> {
    private List<T> content;
    private long totalElements;
    private int totalPages;
    private int size;
    private int number;
    private int numberOfElements;
}
