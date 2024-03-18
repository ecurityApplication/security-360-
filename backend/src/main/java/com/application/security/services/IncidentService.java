package com.application.security.services;

import com.application.security.entity.Incident;

import java.util.List;

public interface IncidentService {
    Incident AjouterIncident(Incident i);
   // void DeleteIncident(Incident i);
    void DeleteIncident(Long id);

    List<Incident> getAllIncident();
    Incident updateIncident(Long id, Incident updatedIncident);
    Object getIncidentById(long id);


}
