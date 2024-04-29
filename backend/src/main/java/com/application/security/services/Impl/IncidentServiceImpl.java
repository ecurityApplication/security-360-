package com.application.security.services.Impl;

import com.application.security.entity.Incident;
import com.application.security.entity.User;
import com.application.security.repository.Incidentrepository;
import com.application.security.repository.UserRepository;
import com.application.security.services.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service

public class IncidentServiceImpl implements IncidentService {
    @Autowired
    Incidentrepository repIncident;

public Incident AjouterIncident(Incident i) {
return  repIncident.save(i);
}

    @Override
    public void DeleteIncident(Long id) {
        repIncident.deleteById(id);
    }


    @Override
    public List<Incident> getAllIncident(String searchKey) {
        if(searchKey.equals("")) {

            return (List<Incident>) repIncident.findAll();
        }
        else {
            return (List<Incident>) repIncident. findByAnalystContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                    searchKey, searchKey);

        }
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
            existingIncident.setFunctionalEscalation(updatedIncident.getFunctionalEscalation());
            existingIncident.setHerarachicescalation(updatedIncident.getHerarachicescalation());
            existingIncident.setResolutionandrecovery(updatedIncident.getResolutionandrecovery());
            existingIncident.setLessonLeraned(updatedIncident.getLessonLeraned());
            existingIncident.setManagementescalation(updatedIncident.getManagementescalation());

            // Save the updated incident
            return repIncident.save(existingIncident);
        } else {
            // Handle the case
            throw new EmptyResultDataAccessException(1);
        }

    }
//get Incidents By Date
    @Override
    public List<Incident> getIncidentsByDate(Date date) {
       return repIncident.findByDate(date);
    }

//get Incidents By Category
    @Override
    public List<Incident> getIncidentsByCategory(String category) {
        return repIncident.findByCategory(category);
    }

    //MONTHLY
    //MTTA
    public double getAverageTimeAnalyseCurrentMonth() {
        List<Incident> incidents = repIncident.findIncidentsInCurrentMonth();
        if (incidents.isEmpty()) {
            return 0.0;
        }

        int totalTimeAnalyse = 0;
        for (Incident incident : incidents) {
            totalTimeAnalyse += incident.getTimeAnalyse();
        }

        return (double) totalTimeAnalyse / incidents.size();
    }
    //Number of Incidents This month
    @Override
    public List<Map<String, Object>> getCurrentMonthIncidentCounts() {
        return repIncident.getIncidentCountByCurrentMonth();
    }

    //get Tickets Raised Per Month
    @Override
    public Map<String, Long> getTicketRaisedPerIncident() {
        List<Object[]> results = repIncident.getTicketRaisedPerIncident();
        Map<String, Long> ticketRaisedCounts = new HashMap<>();
        for (Object[] row : results) {
            String ticketRaised = (String) row[0];
            Long count = (Long) row[1];
            ticketRaisedCounts.put(ticketRaised, count);
        }
        return ticketRaisedCounts;
    }

    //count Events PerAnalyst




    //Number of alerts per plant
    @Override
    public Map<String, Map<String, Long>> getIncidentCountByPlantNameAndMonth() {
        List<Object[]> results = repIncident.getIncidentCountByPlantNameAndMonth();

        Map<String, Map<String, Long>> incidentCountByPlantNameAndMonth = new HashMap<>();

        for (Object[] row : results) {
            String plantName = (String) row[0];
            Long incidentCount = (Long) row[1];
            String month = (String) row[2];

            if (!incidentCountByPlantNameAndMonth.containsKey(plantName)) {
                incidentCountByPlantNameAndMonth.put(plantName, new HashMap<>());
            }

            incidentCountByPlantNameAndMonth.get(plantName).put(month, incidentCount);
        }

        return incidentCountByPlantNameAndMonth;
    }

    //Number of treated incidents by severity
    @Override
    public List<Object[]> countIncidentsBySeverityLevelForCurrentMonth() {
        return repIncident.countIncidentsBySeverityLevelForCurrentMonth();
    }

//Yearly
    //MTTA
public Double getAverageTimeAnalyseForCurrentYear() {
    return repIncident.getAverageTimeAnalyseForCurrentYear();
}
//Number of Incident this  year
@Override
public int countIncidentsForCurrentYear() {
    return repIncident.countIncidentsForCurrentYear();
}

 //Tickets Raised /incident
@Override
public List<Map<String, Object>> getTicketsRaisedInCurrentYear() {
    return repIncident.getTicketsRaisedInCurrentYear();
}


    //count Events PerAnalyst
//Number of treated incidents by severity
@Override
    public Map<String, Long> getIncidentCountBySeverityLevelForCurrentYear() {
        List<Object[]> results = repIncident.getIncidentCountBySeverityLevelForCurrentYear();
        Map<String, Long> incidentCountBySeverityLevel = new HashMap<>();

        for (Object[] row : results) {
            String severityLevel = (String) row[0];
            Long count = (Long) row[1];
            incidentCountBySeverityLevel.put(severityLevel, count);
        }

        return incidentCountBySeverityLevel;
    }
    //Number of incidents per month of the current year
    @Override
    public List<Object[]> countIncidentsPerMonth() {
        return repIncident.countIncidentsPerMonth();
    }


}





