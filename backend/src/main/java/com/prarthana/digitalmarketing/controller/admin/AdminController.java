package com.prarthana.digitalmarketing.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, String>> getDashboard() {

        return ResponseEntity.ok(
                Map.of(
                        "status", "SUCCESS",
                        "message", "Welcome to Prarthana Digital Marketing Admin Dashboard",
                        "access", "ADMIN"
                )
        );
    }
}
