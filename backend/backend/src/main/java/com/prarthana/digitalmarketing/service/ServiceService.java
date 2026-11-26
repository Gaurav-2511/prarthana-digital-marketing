
package com.prarthana.digitalmarketing.service;

import com.prarthana.digitalmarketing.entity.Service;

import java.util.List;
import java.util.Optional;

public interface ServiceService {

    Service createService(Service service);

    List<Service> getAllServices();

    List<Service> getActiveServices();

    Optional<Service> getServiceById(Long id);

    Service updateService(Long id, Service service);

    void deleteService(Long id);
}
