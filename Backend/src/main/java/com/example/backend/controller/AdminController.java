package com.example.backend.controller;

import com.example.backend.Dto.LoginDto;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginDto loginDto) {
        System.out.println("Attempting admin login for: " + loginDto.getEmail());
        User admin = userRepository.findByEmail(loginDto.getEmail());
        if (admin != null && admin.isAdmin() && passwordEncoder.matches(loginDto.getPassword(), admin.getPassword())) {
            return ResponseEntity.ok("Admin Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Admin Credentials");
        }
    }
}
