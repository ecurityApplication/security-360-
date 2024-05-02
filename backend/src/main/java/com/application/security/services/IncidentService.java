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


    public List<Map<String, Object>> getTicketsRaisedInCurrentMonth() ;



    Map<String, Map<String, Long>> getIncidentCountByPlantNameAndMonth();
    
    Double calculateAverageFalsePositiveCurrentMonth();
    double calculateAverageMTTR();

     Map<String, Long> getNumeventsperanalyst();

    Map<String, Long> getIncidentCountBySeverityLevelForCurrentYear();
    Map<String, Long> countIncidentsBySeverityLevelForCurrentMonth();
    Map<String, Long> getNumeventsperanalystCurrentYear();




    //     List<Object[]> countIncidentsBySeverityLevelForCurrentMonth() ;
//YEARLY
     Double getAverageTimeAnalyseForCurrentYear();
     int countIncidentsForCurrentYear();

     List<Map<String, Object>> getTicketsRaisedInCurrentYear();

    public Map<String, Integer> getIncidentCountPerMonthForCurrentYear();
     double getAverageTimeAnalyseCurrentMonth();

    Double calculateAverageFalsePositiveCurrentYear();



  

}
