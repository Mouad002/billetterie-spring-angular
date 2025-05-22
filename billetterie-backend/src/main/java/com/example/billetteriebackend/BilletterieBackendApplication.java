package com.example.billetteriebackend;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.entities.*;
import com.example.billetteriebackend.repositories.EventRepository;
import com.example.billetteriebackend.repositories.OrganizerRepository;
import com.example.billetteriebackend.repositories.TicketRepository;
import com.example.billetteriebackend.services.OrganizerServices;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Random;

import java.sql.Time;
import java.util.Date;

@SpringBootApplication
public class BilletterieBackendApplication {
	private final Random random = new Random();

	public static void main(String[] args) {
		SpringApplication.run(BilletterieBackendApplication.class, args);
	}


}
