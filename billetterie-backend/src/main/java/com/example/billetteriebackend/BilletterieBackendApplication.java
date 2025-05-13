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

	@Bean
	CommandLineRunner adminFakeDataInitializer(OrganizerRepository organizerRepository, EventRepository eventRepository, TicketRepository ticketRepository) {
		return args -> {
//			Organizer organizer = new Organizer();
//			organizer.setFullName("John Doe");
//			organizer.setUsername("johndoe");
//			organizer.setPassword("secure123");
//			organizer.setEmail("john.doe@example.com");
//			organizer.setTel("+1234567890");
//			organizerRepository.save(organizer);
//
//			Category category1 = new Category();
//			category1.setName("Music Concerts");
//
//			Category category2 = new Category();
//			category2.setName("Tech Conferences");
//
//			Category category3 = new Category();
//			category3.setName("Art Exhibitions");
//
//			categoryRepository.save(category1);
//			categoryRepository.save(category2);
//			categoryRepository.save(category3);

			// Create and save categories

			List<Category> categories = Arrays.asList(Category.CINEMA, Category.ATELIER, Category.SPORT);

			// Create and save organizer
			Organizer organizer = new Organizer();
			organizer.setFullName("John Doe");
			organizer.setUsername("johndoe");
			organizer.setPassword("secure123");
			organizer.setEmail("john.doe@example.com");
			organizer.setTel("+1234567890");
			organizer = organizerRepository.save(organizer);

			// Create 10 events with random categories
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

			Event event1 = createEvent("Summer Music Festival", "Annual outdoor music festival",
					"Central Park, New York", "music1.jpg", Status.REFUSED,
					dateFormat.parse("2023-06-15"), dateFormat.parse("2023-06-18"),
					getRandomCategory(categories), organizer);

			Event event2 = createEvent("Tech Summit", "Biggest tech conference",
					"San Francisco", "tech1.jpg", Status.REFUSED,
					dateFormat.parse("2023-07-10"), dateFormat.parse("2023-07-12"),
					getRandomCategory(categories), organizer);

			Event event3 = createEvent("Modern Art Expo", "Contemporary art exhibition",
					"London", "art1.jpg", Status.REFUSED,
					dateFormat.parse("2023-08-05"), dateFormat.parse("2023-09-15"),
					getRandomCategory(categories), organizer);

			Event event4 = createEvent("Jazz Night", "Evening of smooth jazz",
					"Tokyo", "music2.jpg", Status.REFUSED,
					dateFormat.parse("2023-05-20"), dateFormat.parse("2023-05-20"),
					getRandomCategory(categories), organizer);

			Event event5 = createEvent("AI Conference", "Latest in artificial intelligence",
					"Berlin", "tech2.jpg", Status.REFUSED,
					dateFormat.parse("2023-09-18"), dateFormat.parse("2023-09-20"),
					getRandomCategory(categories), organizer);

			Event event6 = createEvent("Classical Symphony", "Orchestra performance",
					"Vienna", "music3.jpg", Status.REFUSED,
					dateFormat.parse("2023-10-05"), dateFormat.parse("2023-10-05"),
					getRandomCategory(categories), organizer);

			Event event7 = createEvent("Blockchain Expo", "Future of decentralized tech",
					"Singapore", "tech3.jpg", Status.REFUSED,
					dateFormat.parse("2023-11-15"), dateFormat.parse("2023-11-17"),
					getRandomCategory(categories), organizer);

			Event event8 = createEvent("Street Art Festival", "Urban art showcase",
					"Miami", "art2.jpg", Status.REFUSED,
					dateFormat.parse("2023-12-01"), dateFormat.parse("2023-12-10"),
					getRandomCategory(categories), organizer);

			Event event9 = createEvent("Pop Music Awards", "Annual pop music celebration",
					"Los Angeles", "music4.jpg", Status.REFUSED,
					dateFormat.parse("2023-04-22"), dateFormat.parse("2023-04-22"),
					getRandomCategory(categories), organizer);

			Event event10 = createEvent("Digital Art Show", "InterREFUSED digital installations",
					"Paris", "art3.jpg", Status.REFUSED,
					dateFormat.parse("2023-07-30"), dateFormat.parse("2023-08-15"),
					getRandomCategory(categories), organizer);

			// Save all events
			eventRepository.saveAll(Arrays.asList(
					event1, event2, event3, event4, event5,
					event6, event7, event8, event9, event10
			));

			Ticket ticket1 = new Ticket();
			ticket1.setSeatNumber("A12");
			ticket1.setPrice(49.99);
			ticket1.setReservationDate(new Date()); // Current date
			ticket1.setEvent(event1); // Assume event1 exists

			Ticket ticket2 = Ticket.builder()
					.seatNumber("VIP-3")
					.price(149.99) // Discounted price
					.reservationDate(Date.from(LocalDate.of(2023, 12, 25).atStartOfDay(ZoneId.systemDefault()).toInstant()))
					.event(event2) // Existing Event
					.user(organizer)
					.build();

			Ticket ticket3 = Ticket.builder()
					.seatNumber("B7")
					.price(29.99) // Discounted price
					.reservationDate(Date.from(LocalDate.now().plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant()))
					.event(event1) // Existing Event
					.build();

			ticketRepository.saveAll(Arrays.asList(ticket1, ticket2, ticket3));
		};
	}

	private Event createEvent(String title, String description, String location,
							  String image, Status status, Date dateEvent, Date heureEvent,
							  Category category, Organizer organizer) {
		Event event = new Event();
		event.setTitle(title);
		event.setDescription(description);
		event.setLocation(location);
		event.setImage(image);
		event.setStatus(status);
		event.setDateEvent(dateEvent);
		event.setHeure(heureEvent);
		event.setCategory(category);
		event.setOrganizer(organizer);
		return event;
	}

	private Category getRandomCategory(List<Category> categories) {
		return categories.get(random.nextInt(categories.size()));
	}

//    @Bean
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
