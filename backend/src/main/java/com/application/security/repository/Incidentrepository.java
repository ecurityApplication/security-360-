package com.application.security.repository;


import com.application.security.entity.Incident;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface Incidentrepository extends CrudRepository<Incident,Long> {


    List<Incident> findByDate(Date date);
}
