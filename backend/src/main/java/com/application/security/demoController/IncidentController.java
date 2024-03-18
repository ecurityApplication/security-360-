
package com.application.security.demoController;

import com.application.security.entity.Incident;
import com.application.security.repository.Incidentrepository;
import com.application.security.services.IncidentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200" )
@RequestMapping("/api/v1/incident")
@RequiredArgsConstructor
public class IncidentController {
    @Autowired
    IncidentServiceImpl incidentService;
    @Autowired
    Incidentrepository incidentrepository;
    @GetMapping("/Incident")
    @ResponseBody
    public List<Incident> getAllIncident(){
        List<Incident>list=incidentService.getAllIncident();
        return list;
    }
    @PostMapping("/Incident")
@ResponseBody
    public Incident AjouterIncident(@RequestBody Incident i){
        return incidentService.AjouterIncident(i);
    }
    @DeleteMapping("/Incident/{id}")
    @ResponseBody
    public void DeleteIncident(@PathVariable("id")Long idincident){
        incidentService.DeleteIncident(idincident);
    }

// get employee by id rest api

    @GetMapping("/Incident/{id}")
    @ResponseBody
    public ResponseEntity<Incident> getIncidentById(@PathVariable(name = "id") long id){
        Incident incident = incidentrepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("incident not exist with id :" + id));
        return ResponseEntity.ok(incident);}


    @PutMapping("/Incident/{id}")
    @ResponseBody
    public ResponseEntity<Incident> updateIncident(@PathVariable(name = "id") Long id, @RequestBody Incident incident) {
        // Call the service method to update the incident
        Incident updated = incidentService.updateIncident(id, incident);
        if(updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            // Handle the case where the incident was not found
            return ResponseEntity.notFound().build();
        }
    }

}
