package com.prarthana.digitalmarketing.repository;

import com.prarthana.digitalmarketing.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    Optional<Portfolio> findBySlug(String slug);

    boolean existsBySlug(String slug);

    List<Portfolio> findByActiveTrueOrderByDisplayOrderAsc();

    List<Portfolio> findByActiveTrueAndFeaturedTrueOrderByDisplayOrderAsc();
}
