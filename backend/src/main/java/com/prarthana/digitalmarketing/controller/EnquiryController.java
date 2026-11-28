package com.prarthana.digitalmarketing.controller;

import com.prarthana.digitalmarketing.dto.request.EnquiryRequest;
import com.prarthana.digitalmarketing.dto.request.EnquiryStatusRequest;
import com.prarthana.digitalmarketing.entity.Enquiry;
import com.prarthana.digitalmarketing.service.EnquiryService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    // Public: Submit a new enquiry
    @PostMapping
    public ResponseEntity<Enquiry> createEnquiry(
            @Valid @RequestBody EnquiryRequest request) {

        Enquiry enquiry = new Enquiry();
        enquiry.setName(request.getName().trim());
        enquiry.setEmail(request.getEmail().trim());
        enquiry.setPhone(request.getPhone().trim());
        enquiry.setSubject(request.getSubject().trim());
        enquiry.setMessage(request.getMessage().trim());

        Enquiry savedEnquiry = enquiryService.createEnquiry(enquiry);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedEnquiry);
    }

    // Admin: Get all enquiries
    @GetMapping
    public ResponseEntity<List<Enquiry>> getAllEnquiries() {
        return ResponseEntity.ok(enquiryService.getAllEnquiries());
    }

    // Admin: Get enquiry by ID
    @GetMapping("/{id}")
    public ResponseEntity<Enquiry> getEnquiryById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                enquiryService.getEnquiryById(id)
        );
    }

    // Admin: Update enquiry status
    @PutMapping("/{id}/status")
    public ResponseEntity<Enquiry> updateEnquiryStatus(
            @PathVariable Long id,
            @Valid @RequestBody EnquiryStatusRequest request) {

        Enquiry updatedEnquiry = enquiryService.updateEnquiryStatus(
                id,
                request.getStatus()
        );

        return ResponseEntity.ok(updatedEnquiry);
    }

    // Admin: Delete enquiry
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnquiry(
            @PathVariable Long id) {

        enquiryService.deleteEnquiry(id);
        return ResponseEntity.noContent().build();
    }
}
