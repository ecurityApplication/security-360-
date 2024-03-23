
package com.application.security.demoController;

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
//@CrossOrigin(origins = "http://localhost:4200" )
@RequestMapping("/api/v1/incidents")
@RequiredArgsConstructor
public class IncidentController {
    @Autowired
    IncidentServiceImpl incidentService;
    @Autowired
    Incidentrepository incidentrepository;
    @GetMapping("/getAll")
    @ResponseBody
    public List<Incident> getAllIncident(){
        List<Incident>list=incidentService.getAllIncident();
        return list;
    }
    @PostMapping("/add")
@ResponseBody
    public Incident AjouterIncident(@RequestBody Incident i){
        return incidentService.AjouterIncident(i);
    }
    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public void DeleteIncident(@PathVariable("id")Long idincident){
        incidentService.DeleteIncident(idincident);
    }

// get employee by id rest api

    @GetMapping("/getById/{id}")
    @ResponseBody
    public ResponseEntity<Incident> getIncidentById(@PathVariable(name = "id") long id){
        Incident incident = incidentrepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("incident not exist with id :" + id));
        return ResponseEntity.ok(incident);}


    @GetMapping("/getByDate/{date}")
    @ResponseBody
    public ResponseEntity<List<Incident>> getIncidentsByDate(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        List<Incident> incidents = incidentrepository.findByDate(date);
        if (incidents.isEmpty()) {
            throw new ResourceNotFoundException("No incidents found for date: " + date);
        }
        return ResponseEntity.ok(incidents);
    }





    @PutMapping("/update/{id}")
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
