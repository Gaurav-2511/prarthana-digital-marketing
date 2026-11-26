package com.prarthana.digitalmarketing.service.impl;

import com.prarthana.digitalmarketing.entity.Service;
import com.prarthana.digitalmarketing.exception.ResourceNotFoundException;
import com.prarthana.digitalmarketing.repository.ServiceRepository;
import com.prarthana.digitalmarketing.service.ServiceService;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceServiceImpl(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    @Override
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @Override
    public List<Service> getActiveServices() {
        return serviceRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    @Override
    public Optional<Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    @Override
    public Service updateService(Long id, Service updatedService) {

        Service existingService = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Service not found with id: " + id));

        existingService.setTitle(updatedService.getTitle());
        existingService.setSlug(updatedService.getSlug());
        existingService.setShortDescription(updatedService.getShortDescription());
        existingService.setDescription(updatedService.getDescription());
        existingService.setIcon(updatedService.getIcon());
        existingService.setActive(updatedService.getActive());
        existingService.setDisplayOrder(updatedService.getDisplayOrder());

        return serviceRepository.save(existingService);
    }

    @Override
    public void deleteService(Long id) {

        if (!serviceRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Service not found with id: " + id);
        }

        serviceRepository.deleteById(id);
    }
}
