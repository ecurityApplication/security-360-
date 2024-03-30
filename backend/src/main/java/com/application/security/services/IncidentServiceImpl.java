package com.application.security.services;

import com.application.security.entity.Incident;
import com.application.security.repository.Incidentrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Date;
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
//    public Object getIncidentsByDate(Date date){
//        return repIncident.findByDate(date);
//    }


    @Override
    public Incident updateIncident(Long id, Incident updatedIncident) {
        // Retrieve the existing incident by ID
        Optional<Incident> optionalIncident = repIncident.findById(id);
        // Check if the incident with the provided ID exists
        if (optionalIncident.isPresent()) {
            // Get the existing incident
            Incident existingIncident = optionalIncident.get();
            // Update the existing incident
            existingIncident.setIncidentType(updatedIncident.getIncidentType());
            existingIncident.setDate(updatedIncident.getDate());
            existingIncident.setTitle(updatedIncident.getTitle());
            existingIncident.setSeverityLevel(updatedIncident.getSeverityLevel());
            existingIncident.setCategory(updatedIncident.getCategory());
            existingIncident.setIncidentID(updatedIncident.getIncidentID());
            existingIncident.setTicketRaised(updatedIncident.getTicketRaised());
            existingIncident.setPlantName(updatedIncident.getPlantName());
            existingIncident.setRaisedBy(updatedIncident.getRaisedBy());
            existingIncident.setHostName(updatedIncident.getHostName());
            existingIncident.setUserName(updatedIncident.getUserName());
            existingIncident.setHostStatus(updatedIncident.getHostStatus());
            existingIncident.setInvestigation(updatedIncident.getInvestigation());
            existingIncident.setRemediationOwner(updatedIncident.getRemediationOwner());
            existingIncident.setFirstEvent(updatedIncident.getFirstEvent());
            existingIncident.setAcknowledge(updatedIncident.getAcknowledge());
            existingIncident.setTimeAnalyse(updatedIncident.getTimeAnalyse());
            existingIncident.setAnalyst(updatedIncident.getAnalyst());
            existingIncident.setRemediation(updatedIncident.getRemediation());
            existingIncident.setReviewer(updatedIncident.getReviewer());
            existingIncident.setDateTarget(updatedIncident.getDateTarget());
            existingIncident.setEscalation(updatedIncident.getEscalation());
            existingIncident.setIncidentStatus(updatedIncident.getIncidentStatus());
            existingIncident.setFalsePositive(updatedIncident.getFalsePositive());
//            existingIncident.setDescription(updatedIncident.getDescription());


            // Save the updated incident
            return repIncident.save(existingIncident);
        } else {
            // Handle the case
            throw new EmptyResultDataAccessException(1);
        }

    }


    @Override
    public List<Incident> getIncidentsByDate(Date date) {
       return repIncident.findByDate(date);
    }


    @Override
    public List<Incident> getIncidentsByCategory(String category) {
        return repIncident.findByCategory(category);
    }


    


}



