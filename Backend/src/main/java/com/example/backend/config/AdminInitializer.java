package com.example.backend.config;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.concurrent.ThreadLocalRandom;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@bank.com") == null) {
                User admin = new User();

                admin.setUser_name("Admin");
                admin.setEmail("admin@bank.com");
                admin.setPassword(passwordEncoder.encode("admin123")); // Securely hashed password
                admin.setAdmin(true);
                admin.setAccountNumber(generateAccountNumber());
                userRepository.save(admin);
                System.out.println("Admin user created successfully!");
            }
        };
    }

    private String generateAccountNumber() {
        long min = 100000000000L;
        long max = 999999999999L;
        return String.valueOf(ThreadLocalRandom.current().nextLong(min, max + 1));
    }
}
