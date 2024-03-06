package com.application.security.repository;

import com.application.security.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
}
