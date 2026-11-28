package com.prarthana.digitalmarketing.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class EnquiryStatusRequest {

    @NotBlank(message = "Enquiry status is required")
    @Pattern(
            regexp = "NEW|IN_PROGRESS|RESOLVED",
            message = "Status must be NEW, IN_PROGRESS or RESOLVED"
    )
    private String status;

    public EnquiryStatusRequest() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
