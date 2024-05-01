package com.application.security.services;

import com.application.security.entity.Incident;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IncidentService {
    Incident AjouterIncident(Incident i);

    void DeleteIncident(Long id);

    List<Incident> getAllIncident(String searchKey);

    Object getIncidentById(long id);

    Incident updateIncident(Long id, Incident updatedIncident);

    List<Incident> getIncidentsByDate(Date date);

    List<Incident> getIncidentsByCategory(String category);
    //MONTHLY
    public int getIncidentsCountForCurrentMonth();

     double getAverageTimeAnalyseCurrentMonth();

    Map<String, Long> getTicketRaisedPerIncident();

    Map<String, Map<String, Long>> getIncidentCountByPlantNameAndMonth();

    Map<String, Long> countIncidentsBySeverityLevelForCurrentMonth();

   double calculateAverageMTTR();
    public double getAverageFalsePositiveForCurrentMonth();
//YEARLY

    int countIncidentsForCurrentYear();

    Double getAverageTimeAnalyseForCurrentYear();

    List<Map<String, Object>> getTicketsRaisedInCurrentYear();

    Map<String, Long> getIncidentCountBySeverityLevelForCurrentYear();

     Map<String, Integer> getIncidentCountPerMonthForCurrentYear();


}
