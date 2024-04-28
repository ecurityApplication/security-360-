package com.application.security.services;

import com.application.security.dto.ChartData;
import com.application.security.entity.Incident;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IncidentService {
    Incident AjouterIncident(Incident i);

    void DeleteIncident(Long id);

    List<Incident> getAllIncident();

    List<Incident> getAllIncident(String searchKey);
    Incident updateIncident(Long id, Incident updatedIncident);

    Object getIncidentById(long id);

    List<Incident> getIncidentsByDate(Date date);

    List<Incident> getIncidentsByCategory(String category);
//MONTHLY
    List<Map<String, Object>> getCurrentMonthIncidentCounts();

    /*List<Map<String, Object>> getTicketsRaisedPerMonth();*/
    Map<String, Long> getTicketRaisedPerIncident();

    Map<String, Long> countEventsPerAnalyst();

    Map<String, Map<String, Long>> getIncidentCountByPlantNameAndMonth();

     List<Object[]> countIncidentsBySeverityLevelForCurrentMonth() ;
//YEARLY
     int countIncidentsForCurrentYear();

     List<Map<String, Object>> getTicketsRaisedInCurrentYear();
    /* List<Object[]> getIncidentCountPerAnalystForCurrentYear();*/
     List<Object[]> countIncidentsPerMonth();

}

