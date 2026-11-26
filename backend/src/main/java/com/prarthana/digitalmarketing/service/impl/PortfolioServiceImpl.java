
package com.prarthana.digitalmarketing.service.impl;

import com.prarthana.digitalmarketing.entity.Portfolio;
import com.prarthana.digitalmarketing.repository.PortfolioRepository;
import com.prarthana.digitalmarketing.service.PortfolioService;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class PortfolioServiceImpl implements PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioServiceImpl(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    @Override
    public Portfolio createPortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    @Override
    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    @Override
    public List<Portfolio> getActivePortfolios() {
        return portfolioRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    @Override
    public List<Portfolio> getFeaturedPortfolios() {
        return portfolioRepository.findByActiveTrueAndFeaturedTrueOrderByDisplayOrderAsc();
    }

    @Override
    public Optional<Portfolio> getPortfolioById(Long id) {
        return portfolioRepository.findById(id);
    }

    @Override
    public Portfolio updatePortfolio(Long id, Portfolio updatedPortfolio) {
        Portfolio existingPortfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Portfolio not found with id: " + id));

        existingPortfolio.setTitle(updatedPortfolio.getTitle());
        existingPortfolio.setSlug(updatedPortfolio.getSlug());
        existingPortfolio.setCategory(updatedPortfolio.getCategory());
        existingPortfolio.setDescription(updatedPortfolio.getDescription());
        existingPortfolio.setImageUrl(updatedPortfolio.getImageUrl());
        existingPortfolio.setProjectUrl(updatedPortfolio.getProjectUrl());
        existingPortfolio.setFeatured(updatedPortfolio.getFeatured());
        existingPortfolio.setActive(updatedPortfolio.getActive());
        existingPortfolio.setDisplayOrder(updatedPortfolio.getDisplayOrder());

        return portfolioRepository.save(existingPortfolio);
    }

    @Override
    public void deletePortfolio(Long id) {
        if (!portfolioRepository.existsById(id)) {
            throw new RuntimeException(
                    "Portfolio not found with id: " + id);
        }

        portfolioRepository.deleteById(id);
    }
}
