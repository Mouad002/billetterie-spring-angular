package com.example.billetteriebackend;

import com.example.billetteriebackend.dtos.CategoryDTO;
import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.dtos.OrganizerDTO;
import com.example.billetteriebackend.entities.Status;
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

	@Bean
	CommandLineRunner commandLineRunner(OrganizerServices organizerServices) {
		return args -> {

			CategoryDTO categoryDTO1 = new CategoryDTO();
			categoryDTO1.setName("Conférence");
			CategoryDTO categoryDTO2 = new CategoryDTO();
			categoryDTO2.setName("Atelier");
			CategoryDTO categoryDTO3 = new CategoryDTO();
			categoryDTO3.setName("Concert");
			CategoryDTO categoryDTO4 = new CategoryDTO();
			categoryDTO4.setName("Exposition");

			organizerServices.saveCategory(categoryDTO1);
			organizerServices.saveCategory(categoryDTO2);
			organizerServices.saveCategory(categoryDTO3);
			organizerServices.saveCategory(categoryDTO4);

			// 2. Créer un événement
			EventDTO eventDTO = new EventDTO();
			eventDTO.setTitle("Spring Boot Conf");
			eventDTO.setDescription("Conférence autour de Spring Boot et du développement Java");
			eventDTO.setCategory(categoryDTO1);
			eventDTO.setImage("1.jpg");
			eventDTO.setLocation("Casablanca");
			eventDTO.setDateEvent(new Date());
			eventDTO.setStatus(Status.COMPLETED);

			EventDTO event1 = new EventDTO();
			event1.setTitle("Dev Meetup 2025");
			event1.setDescription("Rencontre mensuelle des développeurs pour partager les nouveautés tech.");
			event1.setCategory(categoryDTO2);
			event1.setImage("2.jpg"); // aucune image pour le moment
			event1.setLocation("Rabat, Technopark");
			event1.setDateEvent(new Date());
			event1.setStatus(Status.CANCELED);

			EventDTO event2 = new EventDTO();
			event2.setTitle("Atelier UX Design");
			event2.setDescription("Atelier interactif pour apprendre les bases de l’expérience utilisateur.");
			event2.setCategory(categoryDTO3);
			event2.setImage("3.jpg");
			event2.setLocation("Fès, Campus INPT");
			event2.setDateEvent(new Date());
			event2.setStatus(Status.CANCELED);

			EventDTO event3 = new EventDTO();
			event3.setTitle("Exposition Art Numérique");
			event3.setDescription("Une expo mettant en avant les artistes numériques marocains.");
			event3.setCategory(categoryDTO4);
			event3.setImage("4.jpg");
			event3.setLocation("Marrakech, Galerie Riad");
			event3.setDateEvent(new Date());
			event3.setStatus(Status.POSTPONED);




			organizerServices.saveEvent(eventDTO);
			organizerServices.saveEvent(event1);
			organizerServices.saveEvent(event2);
			organizerServices.saveEvent(event3);
		};
	}

}
