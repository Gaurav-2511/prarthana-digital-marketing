
package com.prarthana.digitalmarketing.controller;

import com.prarthana.digitalmarketing.dto.request.PortfolioRequest;
import com.prarthana.digitalmarketing.entity.Portfolio;
import com.prarthana.digitalmarketing.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
@CrossOrigin(origins = "http://localhost:4200")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    // Convert DTO to Entity
    private Portfolio mapToEntity(PortfolioRequest request) {

        Portfolio portfolio = new Portfolio();

        portfolio.setTitle(request.getTitle());
        portfolio.setSlug(request.getSlug());
        portfolio.setCategory(request.getCategory());
        portfolio.setDescription(request.getDescription());
        portfolio.setImageUrl(request.getImageUrl());
        portfolio.setProjectUrl(request.getProjectUrl());
        portfolio.setFeatured(request.getFeatured());
        portfolio.setActive(request.getActive());
        portfolio.setDisplayOrder(request.getDisplayOrder());

        return portfolio;
    }

    // Create Portfolio
    @PostMapping
    public ResponseEntity<Portfolio> createPortfolio(
            @Valid @RequestBody PortfolioRequest request) {

        Portfolio portfolio = mapToEntity(request);

        Portfolio createdPortfolio =
                portfolioService.createPortfolio(portfolio);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdPortfolio);
    }

    // Get All Portfolios
    @GetMapping
    public ResponseEntity<List<Portfolio>> getAllPortfolios() {

        return ResponseEntity.ok(portfolioService.getAllPortfolios());
    }

    // Get Active Portfolios
    @GetMapping("/active")
    public ResponseEntity<List<Portfolio>> getActivePortfolios() {

        return ResponseEntity.ok(portfolioService.getActivePortfolios());
    }

    // Get Featured Portfolios
    @GetMapping("/featured")
    public ResponseEntity<List<Portfolio>> getFeaturedPortfolios() {

        return ResponseEntity.ok(portfolioService.getFeaturedPortfolios());
    }

    // Get Portfolio By ID
    @GetMapping("/{id}")
    public ResponseEntity<Portfolio> getPortfolioById(
            @PathVariable Long id) {

        return portfolioService.getPortfolioById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update Portfolio
    @PutMapping("/{id}")
    public ResponseEntity<Portfolio> updatePortfolio(
            @PathVariable Long id,
            @Valid @RequestBody PortfolioRequest request) {

        Portfolio portfolio = mapToEntity(request);

        Portfolio updatedPortfolio =
                portfolioService.updatePortfolio(id, portfolio);

        return ResponseEntity.ok(updatedPortfolio);
    }

    // Delete Portfolio
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(
            @PathVariable Long id) {

        portfolioService.deletePortfolio(id);

        return ResponseEntity.noContent().build();
    }
}
