package com.application.security.services;

import com.application.security.entity.Incident;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IncidentService {
    Incident AjouterIncident(Incident i);

    void DeleteIncident(Long id);



    List<Incident> getAllIncident(String searchKey);
    Incident updateIncident(Long id, Incident updatedIncident);

    Object getIncidentById(long id);

    List<Incident> getIncidentsByDate(Date date);

    List<Incident> getIncidentsByCategory(String category);
//MONTHLY
    List<Map<String, Object>> getCurrentMonthIncidentCounts();

    Map<String, Long> getTicketRaisedPerIncident();



    Map<String, Map<String, Long>> getIncidentCountByPlantNameAndMonth();

     List<Object[]> countIncidentsBySeverityLevelForCurrentMonth() ;
//YEARLY
     Double getAverageTimeAnalyseForCurrentYear();
     int countIncidentsForCurrentYear();

     List<Map<String, Object>> getTicketsRaisedInCurrentYear();
     Map<String, Long> getIncidentCountBySeverityLevelForCurrentYear();
     List<Object[]> countIncidentsPerMonth();

     double getAverageTimeAnalyseCurrentMonth();


}

