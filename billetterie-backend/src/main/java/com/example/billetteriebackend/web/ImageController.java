package com.example.billetteriebackend.web;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/readImages")
@CrossOrigin(origins = "*")
public class ImageController {
    @GetMapping("/Events/{imageName}")
    public ResponseEntity<Resource> getEvenementImage(@PathVariable String imageName) throws IOException {
        Resource resource;
        resource = new ClassPathResource("uploads/Events/"+imageName);
        MediaType contentType;
        if (imageName.toLowerCase().endsWith(".png")) {
            contentType = MediaType.IMAGE_PNG;
        } else if (imageName.toLowerCase().endsWith(".jpg") || imageName.toLowerCase().endsWith(".jpeg")) {
            contentType = MediaType.IMAGE_JPEG;
        } else {
            contentType = MediaType.IMAGE_JPEG;
        }
        return ResponseEntity.ok()
                .contentType(contentType)
                .body(resource);

    }
    @GetMapping("/Profile/{imageName}")
    public ResponseEntity<Resource> getProfileImage(@PathVariable String imageName) throws IOException {
        Resource resource;
        resource = new ClassPathResource("uploads/Profiles/"+imageName);
        MediaType contentType;
        if (imageName.toLowerCase().endsWith(".png")) {
            contentType = MediaType.IMAGE_PNG;
        } else if (imageName.toLowerCase().endsWith(".jpg") || imageName.toLowerCase().endsWith(".jpeg")) {
            contentType = MediaType.IMAGE_JPEG;
        } else {
            contentType = MediaType.IMAGE_JPEG;
        }
        return ResponseEntity.ok()
                .contentType(contentType)
                .body(resource);

    }

}
