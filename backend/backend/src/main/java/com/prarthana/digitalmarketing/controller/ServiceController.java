
package com.prarthana.digitalmarketing.controller;

import com.prarthana.digitalmarketing.dto.request.ServiceRequest;
import com.prarthana.digitalmarketing.entity.Service;
import com.prarthana.digitalmarketing.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:4200")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    // Convert DTO to Entity
    private Service mapToEntity(ServiceRequest request) {

        Service service = new Service();

        service.setTitle(request.getTitle());
        service.setSlug(request.getSlug());
        service.setShortDescription(request.getShortDescription());
        service.setDescription(request.getDescription());
        service.setIcon(request.getIcon());
        service.setActive(request.getActive());
        service.setDisplayOrder(request.getDisplayOrder());

        return service;
    }

    // Create Service
    @PostMapping
    public ResponseEntity<Service> createService(
            @Valid @RequestBody ServiceRequest request) {

        Service service = mapToEntity(request);

        Service createdService = serviceService.createService(service);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdService);
    }

    // Get All Services
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {

        return ResponseEntity.ok(serviceService.getAllServices());
    }

    // Get Active Services
    @GetMapping("/active")
    public ResponseEntity<List<Service>> getActiveServices() {

        return ResponseEntity.ok(serviceService.getActiveServices());
    }

    // Get Service By ID
    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(
            @PathVariable Long id) {

        return serviceService.getServiceById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update Service
    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceRequest request) {

        Service service = mapToEntity(request);

        Service updatedService = serviceService.updateService(id, service);

        return ResponseEntity.ok(updatedService);
    }

    // Delete Service
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(
            @PathVariable Long id) {

        serviceService.deleteService(id);

        return ResponseEntity.noContent().build();
    }
}
