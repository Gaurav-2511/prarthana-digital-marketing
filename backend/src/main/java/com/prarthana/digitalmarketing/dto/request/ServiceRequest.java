package com.prarthana.digitalmarketing.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ServiceRequest {

    @NotBlank(message = "Service title is required")
    @Size(max = 150, message = "Title must not exceed 150 characters")
    private String title;

    @NotBlank(message = "Service slug is required")
    @Size(max = 180, message = "Slug must not exceed 180 characters")
    private String slug;

    @Size(max = 500, message = "Short description must not exceed 500 characters")
    private String shortDescription;

    private String description;

    @Size(max = 100, message = "Icon must not exceed 100 characters")
    private String icon;

    @NotNull(message = "Active status is required")
    private Boolean active = true;

    @NotNull(message = "Display order is required")
    private Integer displayOrder = 0;

    public ServiceRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
