package com.example.billetteriebackend.repositories;

import com.example.billetteriebackend.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
