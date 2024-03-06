package com.application.security.incident;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class IncidentServiceImpl implements IncidentService {
    @Autowired
    Incidentrepository RepIncident;

    @Override
    public Incident AjouterIncident(Incident i) {
        RepIncident.save(i);
        return i;
    }

    @Override
    public void DeleteIncident(Incident i) {
        RepIncident.delete(i);

    }

    @Override
    public void DeleteIncident(Long id) {
        RepIncident.deleteById(id);

    }

    @Override
    public List<Incident> getAllIncident() {
        return (List<Incident>) RepIncident.findAll();

    }

    @Override
    public Incident updateIncident(Long id, Incident updatedIncident) {
        // Retrieve the existing incident by ID
        Optional<Incident> optionalIncident = RepIncident.findById(id);
        // Check if the incident with the provided ID exists
        if (optionalIncident.isPresent()) {
            // Get the existing incident
            Incident existingIncident = optionalIncident.get();
            // Update the existing incident
            existingIncident.setTitle(updatedIncident.getTitle());
            // Save the updated incident
            return RepIncident.save(existingIncident);
        } else {
            // Handle the case
            throw new EmptyResultDataAccessException(1);
        }

    }


}



