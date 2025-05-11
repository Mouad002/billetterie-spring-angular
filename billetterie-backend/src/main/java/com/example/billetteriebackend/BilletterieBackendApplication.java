package com.example.billetteriebackend;

import com.example.billetteriebackend.dtos.EventDTO;
import com.example.billetteriebackend.entities.Category;
import com.example.billetteriebackend.entities.Status;
import com.example.billetteriebackend.services.OrganizerServices;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.sql.Time;
import java.util.Date;

@SpringBootApplication
public class BilletterieBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BilletterieBackendApplication.class, args);
	}

    @Bean
	CommandLineRunner commandLineRunner(OrganizerServices organizerServices) {
		return args -> {

			// 2. Créer un événement
			EventDTO eventDTO = new EventDTO();
			eventDTO.setTitle("Spring Boot Conf");
			eventDTO.setDescription("Conférence autour de Spring Boot et du développement Java");
			eventDTO.setCategory(Category.SPORT);
			eventDTO.setImage("1.jpg");
			eventDTO.setLocation("Casablanca");
			eventDTO.setDateEvent(new Date());
			eventDTO.setHeure(new Time(new Date().getTime()));
			eventDTO.setStatus(Status.COMPLETED);

			EventDTO event1 = new EventDTO();
			event1.setTitle("Dev Meetup 2025");
			event1.setDescription("Rencontre mensuelle des développeurs pour partager les nouveautés tech.");
			event1.setCategory(Category.CONFERENCE);
			event1.setImage("2.jpg"); // aucune image pour le moment
			event1.setLocation("Rabat, Technopark");
			event1.setDateEvent(new Date());
			event1.setHeure(new Time(new Date().getTime()));
			event1.setStatus(Status.CANCELED);

			EventDTO event2 = new EventDTO();
			event2.setTitle("Atelier UX Design");
			event2.setDescription("Atelier interactif pour apprendre les bases de l’expérience utilisateur.");
			event2.setCategory(Category.THEATRE);
			event2.setImage("3.jpg");
			event2.setLocation("Fès, Campus INPT");
			event2.setDateEvent(new Date());
			event2.setHeure(new Time(new Date().getTime()));
			event2.setStatus(Status.CANCELED);

			EventDTO event3 = new EventDTO();
			event3.setTitle("Exposition Art Numérique");
			event3.setDescription("Une expo mettant en avant les artistes numériques marocains.");
			event3.setCategory(Category.THEATRE);
			event3.setImage("4.jpg");
			event3.setLocation("Marrakech, Galerie Riad");
			event3.setDateEvent(new Date());
			event3.setHeure(new Time(new Date().getTime()));
			event3.setStatus(Status.POSTPONED);




			organizerServices.saveEvent(eventDTO);
			organizerServices.saveEvent(event1);
			organizerServices.saveEvent(event2);
			organizerServices.saveEvent(event3);
		};
	}


}
