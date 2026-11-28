package com.prarthana.digitalmarketing.service;

import com.prarthana.digitalmarketing.entity.Enquiry;

import java.util.List;

public interface EnquiryService {

    Enquiry createEnquiry(Enquiry enquiry);

    List<Enquiry> getAllEnquiries();

    Enquiry getEnquiryById(Long id);

    Enquiry updateEnquiryStatus(Long id, String status);

    void deleteEnquiry(Long id);

    long getTotalEnquiries();

    long getEnquiriesByStatus(String status);
}
