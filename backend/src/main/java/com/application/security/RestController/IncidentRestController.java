package com.application.security.RestController;

import com.application.security.Service.IncidentService;
import com.application.security.entity.Incident;
import com.application.security.repository.IncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController @CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class IncidentRestController {
    @Autowired
    IncidentService incidentService;
    @GetMapping("/GetIncident")
    @ResponseBody
    public List<Incident> getAllIncident(){
        List<Incident>list=incidentService.getAllIncident();
        return list;
    }
    @PostMapping("/AddIncident")
    @ResponseBody
    public Incident AjouterIncident(@RequestBody Incident i){
        return incidentService.AjouterIncident(i);
    }
    @DeleteMapping("/deleteIncident/{id}")
    @ResponseBody
    public void DeleteIncident(@PathVariable("id")Long idincident){
        incidentService.DeleteIncident(idincident);
    }
    /*
        @GetMapping("/Incident/{id}")
        public ResponseEntity<Incident>getIncidentBy(@PathVariable("id") long id){
            Incident incident = Incidentrepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("incident not exist with id :" + id));
            return ResponseEntity.ok(incident);

        }*/
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
