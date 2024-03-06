package com.application.security.Service;

import com.application.security.entity.Incident;
import com.application.security.repository.IncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;
@Service
public class IncidentServiceImpl implements IncidentService{
    IncidentRepository repository;
    @Override
    public Incident AjouterIncident(Incident i) {
        repository.save(i);
        return i;
    }

    @Override
    public void DeleteIncident(Incident i) {
       repository.delete(i);
    }

    @Override
    public void DeleteIncident(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Incident> getAllIncident() {
        return (List<Incident>) repository.findAll();
    }

    @Override
    public Incident updateIncident(Long id, Incident updatedIncident) {
        // Retrieve the existing incident by ID
        Optional<Incident> optionalIncident = repository.findById(id);
        // Check if the incident with the provided ID exists
        if (optionalIncident.isPresent()) {
            // Get the existing incident
            Incident existingIncident = optionalIncident.get();
            // Update the existing incident
            existingIncident.setTitle(updatedIncident.getTitle());
            // Save the updated incident
            return repository.save(existingIncident);
        } else {
            // Handle the case
            throw new EmptyResultDataAccessException(1);
        }
    }
}
