package com.example.billetteriebackend.web;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/images")
public class ImageUploadController {
    private static final String UPLOAD_DIR_EVENT = "src/main/resources/uploads/Events/";
    private static final String UPLOAD_DIR_PROFILES = "src/main/resources/uploads/Profiles/";
    @PostMapping("/uploads/Event")
    public String uploadEventImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "Please select a file to upload";
        }
        try {
            // Get the file and save it to the uploads directory
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOAD_DIR_EVENT + file.getOriginalFilename());
            Files.write(path, bytes);
            return file.getOriginalFilename();
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file";
        }
    }
    @PostMapping("/uploads/Profile")
    public String uploadProfileImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "Please select a file to upload";
        }
        try {
            // Get the file and save it to the uploads directory
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOAD_DIR_PROFILES + file.getOriginalFilename());
            Files.write(path, bytes);
            return file.getOriginalFilename();
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file";
        }
    }

}
