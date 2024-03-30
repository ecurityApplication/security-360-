
package com.application.security.controllers;

import com.application.security.entity.Incident;
import com.application.security.repository.Incidentrepository;
import com.application.security.services.IncidentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
// @CrossOrigin(origins = "http://localhost:4200" )
@RequestMapping("/api/v1/incidents")
@RequiredArgsConstructor
public class IncidentController {
    @Autowired
    IncidentServiceImpl incidentService;
    @Autowired
    Incidentrepository incidentrepository;

    @GetMapping("/getAll")
    @ResponseBody
    public List<Incident> getAllIncident() {
        List<Incident> list = incidentService.getAllIncident();
        return list;
    }

    @PostMapping("/add")
    @ResponseBody
    public Incident AjouterIncident(@RequestBody Incident i) {
        return incidentService.AjouterIncident(i);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public void DeleteIncident(@PathVariable("id") Long idincident) {
        incidentService.DeleteIncident(idincident);
    }

    @GetMapping("/getById/{id}")
    @ResponseBody
    public ResponseEntity<Incident> getIncidentById(@PathVariable(name = "id") long id) {
        Incident incident = incidentrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("incident not exist with id :" + id));
        return ResponseEntity.ok(incident);
    }

    @GetMapping("/getByCategory/{category}")
    public List<Incident> getIncidentsByCategory(@RequestParam String category) {
        return incidentService.getIncidentsByCategory(category);
    }

    @GetMapping("/byDate")
    public List<Incident> getIncidentsByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME )Date date) {
        return incidentService.getIncidentsByDate(date);
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public ResponseEntity<Incident> updateIncident(@PathVariable(name = "id") Long id, @RequestBody Incident incident) {
        // Call the service method to update the incident
        Incident updated = incidentService.updateIncident(id, incident);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            // Handle the case where the incident was not found
            return ResponseEntity.notFound().build();
        }
    }

}
