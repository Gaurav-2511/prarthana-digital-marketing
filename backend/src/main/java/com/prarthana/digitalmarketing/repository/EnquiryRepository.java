package com.prarthana.digitalmarketing.repository;

import com.prarthana.digitalmarketing.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

    List<Enquiry> findAllByOrderByCreatedAtDesc();

    long countByStatus(String status);
}
