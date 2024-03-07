package com.project.security.incident;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class IncidentServiceImpl implements IncidentService {
    @Autowired
    Incidentrepository repIncident;

    @Override
    public Incident AjouterIncident(Incident i) {
        repIncident.save(i);
        return i;
    }


    @Override
    public void DeleteIncident(Long id) {
        repIncident.deleteById(id);

    }

    @Override
    public List<Incident> getAllIncident() {
        return (List<Incident>) repIncident.findAll();

    }
    @Override
public Object getIncidentById(long id){
        return repIncident.findById(id);
}

    @Override
    public Incident updateIncident(Long id, Incident updatedIncident) {
        // Retrieve the existing incident by ID
        Optional<Incident> optionalIncident = repIncident.findById(id);
        // Check if the incident with the provided ID exists
        if (optionalIncident.isPresent()) {
            // Get the existing incident
            Incident existingIncident = optionalIncident.get();
            // Update the existing incident
            existingIncident.setTitle(updatedIncident.getTitle());
            // Save the updated incident
            return repIncident.save(existingIncident);
        } else {
            // Handle the case
            throw new EmptyResultDataAccessException(1);
        }

    }


}



