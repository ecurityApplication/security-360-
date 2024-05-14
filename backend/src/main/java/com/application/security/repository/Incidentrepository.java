package com.application.security.repository;


import com.application.security.entity.Incident;
import com.application.security.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;


@Repository
public interface Incidentrepository extends CrudRepository<Incident,Long> {
    //search filter
    public List<Incident> findByAnalystContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String key1, String key2);

    //find by date
    List<Incident> findByDate(Date date);
    List<Incident> findByEscalation(String escalation);
   //List<Incident> findBySeverityLevel(String severityLevel);
    List<Incident> findBySeverityLevelAndDateBetween(String severityLevel, Date startDate, Date endDate);
   @Query("SELECT i FROM Incident i WHERE (i.severityLevel = :severityLevel1 OR i.severityLevel = :severityLevel2) AND i.date BETWEEN :startDate AND :endDate")
   List<Incident> findBySeverityLevelAndDateBetweenIn(String severityLevel1, String severityLevel2, Date startDate, Date endDate);




 // MTTD calculation for low and informational merged
 @Query("SELECT AVG(TIMESTAMPDIFF(SECOND, i.firstEvent, i.acknowledge)) " +
         "FROM Incident i " +
         "WHERE YEAR(i.date) = YEAR(CURDATE()) " +
         "AND i.severityLevel IN ('low', 'informational')")
 Double calculateMTTDSecondsForLowAndInformational();

 // MTTD calculation for medium
 @Query("SELECT AVG(TIMESTAMPDIFF(SECOND, i.firstEvent, i.acknowledge)) " +
         "FROM Incident i " +
         "WHERE YEAR(i.date) = YEAR(CURDATE()) " +
         "AND i.severityLevel = 'medium'")
 Double calculateMTTDSecondsForMedium();

 // MTTD calculation for high and critical merged
 @Query("SELECT AVG(TIMESTAMPDIFF(SECOND, i.firstEvent, i.acknowledge)) " +
         "FROM Incident i " +
         "WHERE YEAR(i.date) = YEAR(CURDATE()) " +
         "AND i.severityLevel IN ('high', 'critical')")
 Double calculateMTTDSecondsForHighAndCritical();



 // MTTR calculation for low and informational merged
 @Query("SELECT AVG(TIMESTAMPDIFF(SECOND, i.firstEvent, i.timeOfClosure)) " +
         "FROM Incident i " +
         "WHERE YEAR(i.date) = YEAR(CURDATE()) " +
         "AND i.severityLevel IN ('low', 'informational')")
 Double calculateMTTRSecondsForLowAndInformational();

 // MTTR calculation for medium
 @Query("SELECT AVG(TIMESTAMPDIFF(SECOND, i.firstEvent, i.timeOfClosure)) " +
         "FROM Incident i " +
         "WHERE YEAR(i.date) = YEAR(CURDATE()) " +
         "AND i.severityLevel = 'medium'")
 Double calculateMTTRSecondsForMedium();

 // MTTR calculation for high and critical merged
 @Query("SELECT AVG(TIMESTAMPDIFF(SECOND, i.firstEvent, i.timeOfClosure)) " +
         "FROM Incident i " +
         "WHERE YEAR(i.date) = YEAR(CURDATE()) " +
         "AND i.severityLevel IN ('high', 'critical')")
 Double calculateMTTRSecondsForHighAndCritical();






   //find by category
    List<Incident> findByCategory(String category);
    //count by category

    @Query(value = "SELECT category, COUNT(*) as count FROM incident GROUP BY category", nativeQuery = true)
    List<Object[]> countIncidentsByCategory();

    //count raised by
    @Query(value = "SELECT raised_by, COUNT(*) as count FROM incident GROUP BY raised_by", nativeQuery = true)
    List<Object[]> countIncidentsByRaisedBy();

    //Tickets raised/incidents monthly
    @Query("SELECT DATE_FORMAT(date, '%Y-%m') AS yearMonth, COUNT(CASE WHEN ticketRaised = 'yes' THEN 1 END) AS ticketsRaisedYes, COUNT(CASE WHEN ticketRaised = 'no' THEN 1 END) AS ticketsRaisedNo FROM Incident WHERE DATE_FORMAT(date, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') GROUP BY yearMonth ORDER BY yearMonth")
    List<Map<String, Object>> getTicketsRaisedInCurrentMonth();

    //Tickets raised/incidents yearly
    @Query("SELECT DATE_FORMAT(date, '%Y') AS year, COUNT(CASE WHEN ticketRaised = 'yes' THEN 1 END) AS ticketsRaisedYes, COUNT(CASE WHEN ticketRaised = 'no' THEN 1 END) AS ticketsRaisedNo FROM Incident WHERE DATE_FORMAT(date, '%Y') = DATE_FORMAT(CURDATE(), '%Y') GROUP BY year ORDER BY year")
    List<Map<String, Object>> getTicketsRaisedInCurrentYear();

    //Number of alerts per plant monthly
//    @Query("SELECT i.plantName, COUNT(i) AS incidentCount, DATE_FORMAT(i.date, '%Y-%m') AS month " +
//            "FROM Incident i " +
//            "GROUP BY i.plantName, DATE_FORMAT(i.date, '%Y-%m') " +
//            "ORDER BY i.plantName, DATE_FORMAT(i.date, '%Y-%m')")
//    List<Object[]> getIncidentCountByPlantNameAndMonth();
    @Query("SELECT i.plantName, COUNT(i) FROM Incident i " +
            "WHERE MONTH(i.date) = MONTH(CURRENT_DATE) " +
            "AND YEAR(i.date) = YEAR(CURRENT_DATE) " +
            "GROUP BY i.plantName")
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

    //Number of treated incidents by severity
    @Query("SELECT i.severityLevel, COUNT(i) AS count " +
            "FROM Incident i " +
            "WHERE YEAR(i.date) = YEAR(CURRENT_DATE) " +
            "GROUP BY i.severityLevel")
    List<Object[]> getIncidentCountBySeverityLevelForCurrentYear();
    //Incident of current Year
    @Query("SELECT COUNT(i) FROM Incident i WHERE YEAR(i.date) = YEAR(CURRENT_DATE)")
    int countIncidentsForCurrentYear();
    //Number of incident Monthly
    @Query("SELECT COUNT(i) FROM Incident i WHERE MONTH(i.date) = MONTH(CURRENT_DATE) AND YEAR(i.date) = YEAR(CURRENT_DATE)")
    int countIncidentsForCurrentMonth();


    // Incident per month of the current year
    @Query(value = "SELECT DATE_FORMAT(date, '%Y-%m') AS month, COUNT(*) AS count " +
            "FROM Incident " +
            "WHERE YEAR(date) = YEAR(CURRENT_DATE()) " +
            "GROUP BY month " +
            "ORDER BY month ASC", nativeQuery = true)
    List<Object[]> getIncidentCountPerMonthForCurrentYear();


    //MTTA
    @Query("SELECT i FROM Incident i WHERE MONTH(i.date) = MONTH(CURRENT_DATE) AND YEAR(i.date) = YEAR(CURRENT_DATE)")
    List<Incident> findIncidentsInCurrentMonth();

    //MTTR
//    @Query("SELECT i FROM Incident i WHERE i.date BETWEEN :startDate AND :endDate")
//    List<Incident> findIncidentsByMonthRange(Date startDate, Date endDate);

    //FPR
    @Query("SELECT AVG(CAST(i.falsePositive AS double)) FROM Incident i WHERE MONTH(i.date) = MONTH(CURRENT_DATE) AND YEAR(i.date) = YEAR(CURRENT_DATE)")
    Double findAverageFalsePositiveCurrentMonth();

    //Yearly

    //MTTA Yearly
    @Query("SELECT AVG(i.timeAnalyse) FROM Incident i WHERE YEAR(i.date) = YEAR(CURRENT_DATE)")
    Double getAverageTimeAnalyseForCurrentYear();

    //MTTR


    //FPR
    @Query("SELECT AVG(CAST(i.falsePositive AS double)) FROM Incident i WHERE YEAR(i.date) = YEAR(CURRENT_DATE)")
    Double findAverageFalsePositiveCurrentYear();
    }