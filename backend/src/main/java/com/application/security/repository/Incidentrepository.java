package com.application.security.repository;


import com.application.security.entity.Incident;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface Incidentrepository extends CrudRepository<Incident,Long> {
    public List<Incident> findByAnalystContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String key1, String key2);

    List<Incident> findByDate(Date date);
    List<Incident> findByCategory(String category);
    @Query(value = "SELECT category, COUNT(*) as count FROM incident GROUP BY category", nativeQuery = true)
    List<Object[]> countIncidentsByCategory();
    @Query(value = "SELECT raised_by, COUNT(*) as count FROM incident GROUP BY raised_by", nativeQuery = true)
    List<Object[]> countIncidentsByRaisedBy();
}
