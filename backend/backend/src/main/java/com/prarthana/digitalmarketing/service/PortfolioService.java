package com.prarthana.digitalmarketing.service;

import com.prarthana.digitalmarketing.entity.Portfolio;

import java.util.List;
import java.util.Optional;

public interface PortfolioService {

    Portfolio createPortfolio(Portfolio portfolio);

    List<Portfolio> getAllPortfolios();

    List<Portfolio> getActivePortfolios();

    List<Portfolio> getFeaturedPortfolios();

    Optional<Portfolio> getPortfolioById(Long id);

    Portfolio updatePortfolio(Long id, Portfolio portfolio);

    void deletePortfolio(Long id);
}
