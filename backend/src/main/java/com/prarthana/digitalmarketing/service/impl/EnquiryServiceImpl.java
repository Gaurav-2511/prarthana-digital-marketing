package com.prarthana.digitalmarketing.service.impl;

import com.prarthana.digitalmarketing.entity.Enquiry;
import com.prarthana.digitalmarketing.exception.ResourceNotFoundException;
import com.prarthana.digitalmarketing.repository.EnquiryRepository;
import com.prarthana.digitalmarketing.service.EnquiryService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnquiryServiceImpl implements EnquiryService {

    private final EnquiryRepository enquiryRepository;

    public EnquiryServiceImpl(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    @Override
    public Enquiry createEnquiry(Enquiry enquiry) {
        enquiry.setStatus("NEW");
        return enquiryRepository.save(enquiry);
    }

    @Override
    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Enquiry getEnquiryById(Long id) {
        return enquiryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Enquiry not found with ID: " + id
                        )
                );
    }

    @Override
    public Enquiry updateEnquiryStatus(Long id, String status) {
        Enquiry enquiry = getEnquiryById(id);
        enquiry.setStatus(status);
        return enquiryRepository.save(enquiry);
    }

    @Override
    public void deleteEnquiry(Long id) {
        Enquiry enquiry = getEnquiryById(id);
        enquiryRepository.delete(enquiry);
    }

    @Override
    public long getTotalEnquiries() {
        return enquiryRepository.count();
    }

    @Override
    public long getEnquiriesByStatus(String status) {
        return enquiryRepository.countByStatus(status);
    }
}
