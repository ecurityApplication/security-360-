package com.application.security.Service;

import com.application.security.entity.Incident;
import com.application.security.repository.IncidentRepository;

import java.util.List;

public interface IncidentService {
    Incident AjouterIncident(Incident i);
    void DeleteIncident(Incident i);
    void DeleteIncident(Long id);

    List<Incident> getAllIncident();
    Incident updateIncident(Long id, Incident updatedIncident);
}
