package com.application.security.incident;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Incidentrepository extends CrudRepository<Incident,Long> {



}
