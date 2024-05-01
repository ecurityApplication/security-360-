package com.application.security.repository;


import com.application.security.entity.Incident;
import com.application.security.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Repository
public interface Incidentrepository extends CrudRepository<Incident,Long> {
    public List<Incident> findByAnalystContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String key1, String key2);

    List<Incident> findByDate(Date date);

    //find by category
    List<Incident> findByCategory(String category);

    @Query(value = "SELECT category, COUNT(*) as count FROM incident GROUP BY category", nativeQuery = true)
    List<Object[]> countIncidentsByCategory();
    //find by ticket raised
    @Query(value = "SELECT raised_by, COUNT(*) as count FROM incident GROUP BY raised_by", nativeQuery = true)
    List<Object[]> countIncidentsByRaisedBy();

//MONTHLY
//MTTA
@Query("SELECT i FROM Incident i WHERE MONTH(i.date) = MONTH(CURRENT_DATE) AND YEAR(i.date) = YEAR(CURRENT_DATE)")
List<Incident> findIncidentsInCurrentMonth();

//Number of incident Monthly
@Query("SELECT DATE_FORMAT(date, '%Y-%m') AS month, COUNT(*) AS count " +
        "FROM Incident " +
        "WHERE DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE(), '%Y-%m') " +
        "GROUP BY month " +
        "ORDER BY month")
List<Map<String, Object>> getIncidentCountByCurrentMonth();
     //Number of incident per user


    //Tickets raised/incidents
    @Query("SELECT i.ticketRaised, COUNT(i) FROM Incident i WHERE MONTH(i.date) = MONTH(CURRENT_DATE) AND YEAR(i.date) = YEAR(CURRENT_DATE) GROUP BY i.ticketRaised")
    List<Object[]> getTicketRaisedPerIncident();

    //Number of alerts per plant monthly
    @Query("SELECT i.plantName, COUNT(i) AS incidentCount, DATE_FORMAT(i.date, '%Y-%m') AS month " +
            "FROM Incident i " +
            "GROUP BY i.plantName, DATE_FORMAT(i.date, '%Y-%m') " +
            "ORDER BY i.plantName, DATE_FORMAT(i.date, '%Y-%m')")
    List<Object[]> getIncidentCountByPlantNameAndMonth();

    //count Events PerAnalyst monthly

    @Query("SELECT i.analyst, COUNT(i) FROM Incident i " +
            "WHERE MONTH(i.date) = MONTH(CURRENT_DATE) " +
            "AND YEAR(i.date) = YEAR(CURRENT_DATE) " +
            "GROUP BY i.analyst")
    List<Object[]> getNumeventsperanalyst();
    //count Events PerAnalyst yearly
    @Query("SELECT i.analyst, COUNT(i) AS count " +
            "FROM Incident i " +
            "WHERE YEAR(i.date) = YEAR(CURRENT_DATE) " +
            "GROUP BY i.analyst")
    List<Object[]> getNumeventsperanalystCurrentYear();






    //Number of treated incidents by severity
    @Query("SELECT i.severityLevel, COUNT(i) FROM Incident i " +
            "WHERE MONTH(i.date) = MONTH(CURRENT_DATE) " +
            "AND YEAR(i.date) = YEAR(CURRENT_DATE) " +
            "GROUP BY i.severityLevel")
    List<Object[]> countIncidentsBySeverityLevelForCurrentMonth();


//Yearly
    //MTTA
@Query("SELECT AVG(i.timeAnalyse) FROM Incident i WHERE YEAR(i.date) = YEAR(CURRENT_DATE)")
Double getAverageTimeAnalyseForCurrentYear();
//Incident of current Year
@Query("SELECT COUNT(i) FROM Incident i WHERE YEAR(i.date) = YEAR(CURRENT_DATE)")
int countIncidentsForCurrentYear();

    //Tickets raised/incidents
@Query("SELECT DATE_FORMAT(date, '%Y') AS year, COUNT(CASE WHEN ticketRaised = 'yes' THEN 1 END) AS ticketsRaisedYes, COUNT(CASE WHEN ticketRaised = 'no' THEN 1 END) AS ticketsRaisedNo FROM Incident WHERE DATE_FORMAT(date, '%Y') = DATE_FORMAT(CURDATE(), '%Y') GROUP BY year ORDER BY year")
List<Map<String, Object>> getTicketsRaisedInCurrentYear();

    //incident per analyst

    //Number of treated incidents by severity
    @Query("SELECT i.severityLevel, COUNT(i) AS count " +
            "FROM Incident i " +
            "WHERE YEAR(i.date) = YEAR(CURRENT_DATE) " +
            "GROUP BY i.severityLevel")
    List<Object[]> getIncidentCountBySeverityLevelForCurrentYear();



    // Incident per month of the current year
    @Query(value = "SELECT MONTH(date) as month, COUNT(*) as totalIncidents " +
            "FROM Incident " +
            "WHERE YEAR(date) = YEAR(CURRENT_DATE) " +
            "GROUP BY MONTH(date)")
    List<Object[]> countIncidentsPerMonth();


}
