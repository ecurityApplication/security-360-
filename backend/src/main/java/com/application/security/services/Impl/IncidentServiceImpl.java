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
    public List<Incident> getEscalations() {
        return repIncident.findByEscalation("Yes");
    }

@Override
public double calculateMTTA(String severityLevel) {
    // Calculate start and end dates for the current year
    Calendar calendar = Calendar.getInstance();
    calendar.set(Calendar.DAY_OF_YEAR, 1); // Set to the first day of the year
    Date startDate = calendar.getTime();
    calendar.set(Calendar.DAY_OF_YEAR, calendar.getActualMaximum(Calendar.DAY_OF_YEAR)); // Set to the last day of the year
    Date endDate = calendar.getTime();

    List<Incident> incidents;
    if (severityLevel.equalsIgnoreCase("low-informational")) {
        incidents = repIncident.findBySeverityLevelAndDateBetweenIn("low", "informational", startDate, endDate);
    } else if (severityLevel.equalsIgnoreCase("high-critical")) {
        incidents = repIncident.findBySeverityLevelAndDateBetweenIn("high", "critical", startDate, endDate);
    } else {
        incidents = repIncident.findBySeverityLevelAndDateBetween(severityLevel, startDate, endDate);
    }

    if (incidents.isEmpty()) {
        return 0; // Handle empty list scenario
    }

    int totalAnalyseTime = incidents.stream().mapToInt(Incident::getTimeAnalyse).sum();
    int incidentCount = incidents.size();
    return (double) totalAnalyseTime / incidentCount;
}
    @Override

    public String calculateMTTDForLowAndInformational() {
        Double mTTDSeconds = repIncident.calculateMTTDSecondsForLowAndInformational();
        return formatDuration(mTTDSeconds);
    }

    @Override

    public String calculateMTTDForMedium() {
        Double mTTDSeconds = repIncident.calculateMTTDSecondsForMedium();
        return formatDuration(mTTDSeconds);
    }
    @Override

    public String calculateMTTDForHighAndCritical() {
        Double mTTDSeconds = repIncident.calculateMTTDSecondsForHighAndCritical();
        return formatDuration(mTTDSeconds);
    }
    @Override

    public String calculateMTTRForLowAndInformational() {
        Double mTTDSeconds = repIncident.calculateMTTRSecondsForLowAndInformational();
        return formatDuration(mTTDSeconds);
    }

    @Override

    public String calculateMTTRForMedium() {
        Double mTTDSeconds = repIncident.calculateMTTRSecondsForMedium();
        return formatDuration(mTTDSeconds);
    }
    @Override

    public String calculateMTTRForHighAndCritical() {
        Double mTTDSeconds = repIncident.calculateMTTRSecondsForHighAndCritical();
        return formatDuration(mTTDSeconds);
    }

    private String formatDuration(Double seconds) {
        if (seconds == null) {
            return "0:00:00";
        }

        long hours = TimeUnit.SECONDS.toHours(seconds.longValue());
        long minutes = TimeUnit.SECONDS.toMinutes(seconds.longValue()) % 60;
        long remainingSeconds = seconds.longValue() % 60;

        return String.format("%d:%02d:%02d", hours, minutes, remainingSeconds);
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
            existingIncident.setTimeOfClosure( updatedIncident.getTimeOfClosure() );
            existingIncident.setRoadCauseAnalysis( updatedIncident.getRoadCauseAnalysis() );




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
    @Override
    //MTTA Yearly
    public Double getAverageTimeAnalyseForCurrentYear() {
        return repIncident.getAverageTimeAnalyseForCurrentYear();
    }



    //get Tickets Raised Per Month
    @Override
    public List<Map<String, Object>> getTicketsRaisedInCurrentMonth() {
        return repIncident.getTicketsRaisedInCurrentMonth();
    }








    //MTTR
//    @Override
//    public double calculateAverageMTTR() {
//        // Récupérer les incidents du mois en cours
//        LocalDate currentMonth = LocalDate.now();
//        Date startDate = Date.from( currentMonth.withDayOfMonth( 1 ).atStartOfDay( ZoneId.systemDefault() ).toInstant() );
//        Date endDate = Date.from( currentMonth.plusMonths( 1 ).withDayOfMonth( 1 ).minusDays( 1 ).atStartOfDay( ZoneId.systemDefault() ).toInstant() );
//        List<Incident> incidents = repIncident.findIncidentsByMonthRange( startDate, endDate );
//
//        // Calculer la moyenne du MTTR
//        OptionalDouble averageMTTR = incidents.stream()
//                .mapToLong( incident -> {
//                    LocalDateTime firstEventDateTime = LocalDateTime.parse( incident.getFirstEvent() );
//                    LocalDateTime timeOfClosureDateTime = LocalDateTime.parse( incident.getTimeOfClosure() );
//                    Instant firstEventInstant = firstEventDateTime.atZone( ZoneId.systemDefault() ).toInstant();
//                    Instant timeOfClosureInstant = timeOfClosureDateTime.atZone( ZoneId.systemDefault() ).toInstant();
//                    return Duration.between( firstEventInstant, timeOfClosureInstant ).toMinutes();
//                } )
//                .average();
//
//        return averageMTTR.orElse( 0.0 );
//    }

    //FPR
    @Override
    public Double calculateAverageFalsePositiveCurrentMonth() {
        return repIncident.findAverageFalsePositiveCurrentMonth();
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
            incidentCountBySeverityLevel.put(severityLevel, count);
        }

        return incidentCountBySeverityLevel;
    }
    //Number of alerts per plant
//    @Override
//    public Map<String, Map<String, Long>> getIncidentCountByPlantNameAndMonth() {
//        List<Object[]> results = repIncident.getIncidentCountByPlantNameAndMonth();
//
//        Map<String, Map<String, Long>> incidentCountByPlantNameAndMonth = new HashMap<>();
//
//        for (Object[] row : results) {
//            String plantName = (String) row[0];
//            Long incidentCount = (Long) row[1];
//            String month = (String) row[2];
//
//            if (!incidentCountByPlantNameAndMonth.containsKey( plantName )) {
//                incidentCountByPlantNameAndMonth.put( plantName, new HashMap<>() );
//            }
//
//            incidentCountByPlantNameAndMonth.get( plantName ).put( month, incidentCount );
//        }
//
//        return incidentCountByPlantNameAndMonth;
//    }
    @Override
    public Map<String, Long> getIncidentCountByPlantNameAndMonth() {
        List<Object[]> results = repIncident.getIncidentCountByPlantNameAndMonth();
        Map<String, Long> incidentCountByPlantNameAndMonth = new HashMap<>();

        for (Object[] row : results) {
            String analyst = (String) row[0];
            Long count = (Long) row[1];
            incidentCountByPlantNameAndMonth.put(analyst, count);
        }

        return incidentCountByPlantNameAndMonth;
    }
    //count Events PerAnalyst

    @Override
    public Map<String, Long> getNumeventsperanalyst() {
        List<Object[]> results = repIncident.getNumeventsperanalyst();
        Map<String, Long> Numeventsperanalyst = new HashMap<>();

        for (Object[] row : results) {
            String analyst = (String) row[0];
            Long count = (Long) row[1];
            Numeventsperanalyst.put(analyst, count);
        }

        return Numeventsperanalyst;
    }
    //count Events PerAnalyst per year

    @Override
    public Map<String, Long> getNumeventsperanalystCurrentYear() {
        List<Object[]> results = repIncident.getNumeventsperanalystCurrentYear();
        Map<String, Long> Numeventsperanalyst = new HashMap<>();

        for (Object[] row : results) {
            String analyst = (String) row[0];
            Long count = (Long) row[1];
            Numeventsperanalyst.put(analyst, count);
        }

        return Numeventsperanalyst;
    }

    //count number of incident Yearly
    @Override
    public int countIncidentsForCurrentYear() {
        return repIncident.countIncidentsForCurrentYear();
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







