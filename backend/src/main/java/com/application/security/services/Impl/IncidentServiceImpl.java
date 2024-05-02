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
        return repIncident.save( i );
    }

    @Override
    public void DeleteIncident(Long id) {
        repIncident.deleteById( id );
    }


    @Override
    public List<Incident> getAllIncident(String searchKey) {
        if (searchKey.equals( "" )) {

            return (List<Incident>) repIncident.findAll();
        } else {
            return (List<Incident>) repIncident.findByAnalystContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                    searchKey, searchKey );

        }
    }

    @Override
    public Object getIncidentById(long id) {
        return repIncident.findById( id );
    }
//    public Object getIncidentsByDate(Date date){
//        return repIncident.findByDate(date);
//    }


    @Override
    public Incident updateIncident(Long id, Incident updatedIncident) {
        // Retrieve the existing incident by ID
        Optional<Incident> optionalIncident = repIncident.findById( id );
        // Check if the incident with the provided ID exists
        if (optionalIncident.isPresent()) {
            // Get the existing incident
            Incident existingIncident = optionalIncident.get();
            // Update the existing incident
            existingIncident.setIncidentType( updatedIncident.getIncidentType() );
            existingIncident.setDate( updatedIncident.getDate() );
            existingIncident.setTitle( updatedIncident.getTitle() );
            existingIncident.setSeverityLevel( updatedIncident.getSeverityLevel() );
            existingIncident.setCategory( updatedIncident.getCategory() );
            existingIncident.setIncidentID( updatedIncident.getIncidentID() );
            existingIncident.setTicketRaised( updatedIncident.getTicketRaised() );
            existingIncident.setPlantName( updatedIncident.getPlantName() );
            existingIncident.setRaisedBy( updatedIncident.getRaisedBy() );
            existingIncident.setHostName( updatedIncident.getHostName() );
            existingIncident.setUserName( updatedIncident.getUserName() );
            existingIncident.setHostStatus( updatedIncident.getHostStatus() );
            existingIncident.setInvestigation( updatedIncident.getInvestigation() );
            existingIncident.setRemediationOwner( updatedIncident.getRemediationOwner() );
            existingIncident.setFirstEvent( updatedIncident.getFirstEvent() );
            existingIncident.setAcknowledge( updatedIncident.getAcknowledge() );
            existingIncident.setTimeAnalyse( updatedIncident.getTimeAnalyse() );
            existingIncident.setAnalyst( updatedIncident.getAnalyst() );
            existingIncident.setRemediation( updatedIncident.getRemediation() );
            existingIncident.setReviewer( updatedIncident.getReviewer() );
            existingIncident.setDateTarget( updatedIncident.getDateTarget() );
            existingIncident.setEscalation( updatedIncident.getEscalation() );
            existingIncident.setIncidentStatus( updatedIncident.getIncidentStatus() );
            existingIncident.setFalsePositive( updatedIncident.getFalsePositive() );
            existingIncident.setFunctionalEscalation( updatedIncident.getFunctionalEscalation() );
            existingIncident.setHerarachicescalation( updatedIncident.getHerarachicescalation() );
            existingIncident.setResolutionandrecovery( updatedIncident.getResolutionandrecovery() );
            existingIncident.setLessonLeraned( updatedIncident.getLessonLeraned() );
            existingIncident.setManagementescalation( updatedIncident.getManagementescalation() );

            // Save the updated incident
            return repIncident.save( existingIncident );
        } else {
            // Handle the case
            throw new EmptyResultDataAccessException( 1 );
        }

    }

    //get Incidents By Date
    @Override
    public List<Incident> getIncidentsByDate(Date date) {
        return repIncident.findByDate( date );
    }

    //get Incidents By Category
    @Override
    public List<Incident> getIncidentsByCategory(String category) {
        return repIncident.findByCategory( category );
    }

    //MONTHLY
    //Number of Incidents This month
    @Override
    public int getIncidentsCountForCurrentMonth() {
        return repIncident.countIncidentsForCurrentMonth();
    }

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


    //get Tickets Raised Per Month
    @Override
    public List<Map<String, Object>> getTicketsRaisedInCurrentMonth() {
        return repIncident.getTicketsRaisedInCurrentMonth();
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

            if (!incidentCountByPlantNameAndMonth.containsKey( plantName )) {
                incidentCountByPlantNameAndMonth.put( plantName, new HashMap<>() );
            }

            incidentCountByPlantNameAndMonth.get( plantName ).put( month, incidentCount );
        }

        return incidentCountByPlantNameAndMonth;
    }

    //Number of treated incidents by severity month


    //MTTR
    @Override
    public double calculateAverageMTTR() {
        // Récupérer les incidents du mois en cours
        LocalDate currentMonth = LocalDate.now();
        Date startDate = Date.from( currentMonth.withDayOfMonth( 1 ).atStartOfDay( ZoneId.systemDefault() ).toInstant() );
        Date endDate = Date.from( currentMonth.plusMonths( 1 ).withDayOfMonth( 1 ).minusDays( 1 ).atStartOfDay( ZoneId.systemDefault() ).toInstant() );
        List<Incident> incidents = repIncident.findIncidentsByMonthRange( startDate, endDate );

        // Calculer la moyenne du MTTR
        OptionalDouble averageMTTR = incidents.stream()
                .mapToLong( incident -> {
                    LocalDateTime firstEventDateTime = LocalDateTime.parse( incident.getFirstEvent() );
                    LocalDateTime timeOfClosureDateTime = LocalDateTime.parse( incident.getTimeOfClosure() );
                    Instant firstEventInstant = firstEventDateTime.atZone( ZoneId.systemDefault() ).toInstant();
                    Instant timeOfClosureInstant = timeOfClosureDateTime.atZone( ZoneId.systemDefault() ).toInstant();
                    return Duration.between( firstEventInstant, timeOfClosureInstant ).toMinutes();
                } )
                .average();

        return averageMTTR.orElse( 0.0 );
    }

    //FPR
    @Override
    public Double calculateAverageFalsePositiveCurrentMonth() {
        return repIncident.findAverageFalsePositiveCurrentMonth();
    }

    //Yearly
    @Override
    public int countIncidentsForCurrentYear() {
        return repIncident.countIncidentsForCurrentYear();
    }

    @Override
    //MTTA
    public Double getAverageTimeAnalyseForCurrentYear() {
        return repIncident.getAverageTimeAnalyseForCurrentYear();
    }
    //Number of Incident this  year


    //Tickets Raised /incident
    @Override
    public List<Map<String, Object>> getTicketsRaisedInCurrentYear() {
        return repIncident.getTicketsRaisedInCurrentYear();
    }


    //    //Number of treated incidents by severity
    @Override
    public Map<String, Long> getIncidentCountBySeverityLevelForCurrentYear() {
        List<Object[]> results = repIncident.getIncidentCountBySeverityLevelForCurrentYear();
        Map<String, Long> incidentCountBySeverityLevel = new HashMap<>();

        for (Object[] row : results) {
            String severityLevel = (String) row[0];
            Long count = (Long) row[1];
            incidentCountBySeverityLevel.put( severityLevel, count );
        }

        return incidentCountBySeverityLevel;
    }

    //Number of treated incidents by severity month
    @Override
    public Map<String, Long> countIncidentsBySeverityLevelForCurrentMonth() {
        List<Object[]> results = repIncident.countIncidentsBySeverityLevelForCurrentMonth();
        Map<String, Long> incidentCountBySeverityLevel = new HashMap<>();

        for (Object[] row : results) {
            String severityLevel = (String) row[0];
            Long count = (Long) row[1];
            incidentCountBySeverityLevel.put( severityLevel, count );
        }

        return incidentCountBySeverityLevel;
    }

    //Number of incidents per month of the current year
    @Override
    public Map<String, Integer> getIncidentCountPerMonthForCurrentYear() {
        List<Object[]> results = repIncident.getIncidentCountPerMonthForCurrentYear();
        Map<String, Integer> incidentCountPerMonth = new LinkedHashMap<>();

        for (Object[] row : results) {
            String month = (String) row[0];
            Integer count = ((Number) row[1]).intValue();
            incidentCountPerMonth.put( month, count );
        }

        return incidentCountPerMonth;
    }

    //FPR
    @Override
    public Double calculateAverageFalsePositiveCurrentYear() {
        return repIncident.findAverageFalsePositiveCurrentYear();
    }
//MTTR

}







