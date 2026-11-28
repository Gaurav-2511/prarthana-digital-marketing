
package com.prarthana.digitalmarketing.controller.admin;

import com.prarthana.digitalmarketing.repository.EnquiryRepository;
import com.prarthana.digitalmarketing.repository.PortfolioRepository;
import com.prarthana.digitalmarketing.repository.ServiceRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ServiceRepository serviceRepository;
    private final PortfolioRepository portfolioRepository;
    private final EnquiryRepository enquiryRepository;

    public AdminController(
            ServiceRepository serviceRepository,
            PortfolioRepository portfolioRepository,
            EnquiryRepository enquiryRepository
    ) {
        this.serviceRepository = serviceRepository;
        this.portfolioRepository = portfolioRepository;
        this.enquiryRepository = enquiryRepository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {

        long totalServices = serviceRepository.count();
        long totalPortfolios = portfolioRepository.count();
        long totalEnquiries = enquiryRepository.count();

        long newEnquiries = enquiryRepository.countByStatus("NEW");
        long inProgressEnquiries = enquiryRepository.countByStatus("IN_PROGRESS");
        long resolvedEnquiries = enquiryRepository.countByStatus("RESOLVED");

        return ResponseEntity.ok(
                Map.of(
                        "status", "SUCCESS",
                        "message", "Welcome to Prarthana Digital Marketing Admin Dashboard",
                        "access", "ADMIN",
                        "totalServices", totalServices,
                        "totalPortfolios", totalPortfolios,
                        "totalEnquiries", totalEnquiries,
                        "newEnquiries", newEnquiries,
                        "inProgressEnquiries", inProgressEnquiries,
                        "resolvedEnquiries", resolvedEnquiries
                )
        );
    }
}
