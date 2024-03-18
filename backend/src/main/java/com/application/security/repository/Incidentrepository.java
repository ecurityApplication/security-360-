package com.application.security.repository;


import com.application.security.entity.Incident;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Incidentrepository extends CrudRepository<Incident,Long> {



}
