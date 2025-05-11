package com.example.billetteriebackend;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.dtos.OrganizerDTO;
import com.example.billetteriebackend.entities.Event;
import com.example.billetteriebackend.entities.Status;
import com.example.billetteriebackend.repositories.EventRepository;
import com.example.billetteriebackend.services.EventService;
import com.example.billetteriebackend.services.OrganizerServices;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Date;

@SpringBootApplication
public class BilletterieBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BilletterieBackendApplication.class, args);
	}

//	@Bean
	CommandLineRunner commandLineRunner(OrganizerServices organizerServices) {
		return args -> {
			// 2. Créer un événement
			EventDTO eventDTO = new EventDTO();
			eventDTO.setTitle("Spring Boot Conf");
			eventDTO.setDescription("Conférence autour de Spring Boot et du développement Java");
			eventDTO.setCategory(null);
			eventDTO.setImage(null);
			eventDTO.setLocation("Casablanca");
			eventDTO.setStartDate(new Date());
			eventDTO.setEndDate(java.sql.Date.valueOf(LocalDate.now().plusDays(1)));
			eventDTO.setStatus(Status.COMPLETED);

			organizerServices.saveEvent(eventDTO);
		};
	}


}
