package com.example.billetteriebackend.dtos;

import com.example.billetteriebackend.entities.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public abstract class UserDTO {

    private String type;

}
