package com.prarthana.digitalmarketing.config;

import com.prarthana.digitalmarketing.entity.User;
import com.prarthana.digitalmarketing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSeeder {

    @Bean
    public CommandLineRunner createAdminUser(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${ADMIN_USERNAME}") String username,
            @Value("${ADMIN_EMAIL}") String email,
            @Value("${ADMIN_PASSWORD}") String password) {

        return args -> {

            if (userRepository.existsByUsername(username)) {
                System.out.println("Admin user already exists.");
                return;
            }

            if (userRepository.existsByEmail(email)) {
                throw new IllegalStateException(
                        "Admin email is already registered with another username."
                );
            }

            User admin = new User();
            admin.setUsername(username);
            admin.setEmail(email);
            admin.setPassword(passwordEncoder.encode(password));
            admin.setRole("ADMIN");
            admin.setEnabled(true);

            userRepository.save(admin);

            System.out.println("Initial ADMIN user created successfully.");
        };
    }
}
