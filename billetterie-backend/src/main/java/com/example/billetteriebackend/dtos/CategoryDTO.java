package com.example.billetteriebackend.dtos;


import com.example.billetteriebackend.entities.Event;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class CategoryDTO {

    private Long id;
    private String name;
}
