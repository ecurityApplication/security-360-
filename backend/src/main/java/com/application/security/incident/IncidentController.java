
package com.application.security.incident;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200" )
@RequestMapping("/api/v1/incident")
public class IncidentController {
    @Autowired
    IncidentService incidentService;
    @GetMapping("/getAllIncident")
    @ResponseBody
    public List<Incident> getAllIncident(){
        List<Incident>list=incidentService.getAllIncident();
        return list;
    }
    @PostMapping("/AjouterIncident")
@ResponseBody
    public Incident AjouterIncident(@RequestBody Incident i){
        return incidentService.AjouterIncident(i);
    }
    @DeleteMapping("/DeleteIncident/{id}")
    @ResponseBody
    public void DeleteIncident(@PathVariable("id")Long idincident){
        incidentService.DeleteIncident(idincident);
    }

    @PutMapping("/updateIncident/{id}")
    @ResponseBody
    public ResponseEntity<Incident> updateIncident(@PathVariable("id") Long id, @RequestBody Incident updatedIncident) {
        // Call the service method to update the incident
        Incident updated = incidentService.updateIncident(id, updatedIncident);
        if(updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            // Handle the case where the incident was not found
            return ResponseEntity.notFound().build();
        }
    }
}
