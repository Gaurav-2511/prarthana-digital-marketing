
package com.prarthana.digitalmarketing.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {

        Map<String, String> response = Map.of(
                "status", "UP",
                "message", "Prarthana Digital Marketing Backend is running"
        );

        return ResponseEntity.ok(response);
    }
}
