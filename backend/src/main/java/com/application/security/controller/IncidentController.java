package com.application.security.controller;

import com.application.security.dto.ChartData;
import com.application.security.entity.ImageModel;
import com.application.security.entity.Incident;
import com.application.security.repository.Incidentrepository;
import com.application.security.services.Impl.IncidentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/v1/incidents")
@RequiredArgsConstructor
public class IncidentController {
    @Autowired
    IncidentServiceImpl incidentService;
    @Autowired
    Incidentrepository incidentrepository;

    @GetMapping("/getAll")
    @ResponseBody
    public List<Incident> getAllIncident( @RequestParam(defaultValue = "") String searchKey){
        return incidentService.getAllIncident(searchKey);
    }

    @PostMapping(value = {"/add"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseBody
    public Incident AjouterIncident(@RequestPart ("incident") Incident i, @RequestPart("imageFile") MultipartFile[] file){
        try {
            Set<ImageModel> images = uploadImage(file);
            i.setIncidentImages(images);
            return incidentService.AjouterIncident(i);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();

        for (MultipartFile file: multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageModels.add(imageModel);
        }

        return imageModels;
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public void DeleteIncident(@PathVariable("id")Long idincident){
        incidentService.DeleteIncident(idincident);
    }

// get incident by id rest api
    @GetMapping("/getById/{id}")
    @ResponseBody
    public ResponseEntity<Incident> getIncidentById(@PathVariable(name = "id") long id){
        Incident incident = incidentrepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("incident not exist with id :" + id));
        return ResponseEntity.ok(incident);
    }

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
    //MONTHLY
    //Number of Incidents This month
    @GetMapping("/monthly-counts/current")
    public ResponseEntity<List<Map<String, Object>>> getCurrentMonthIncidentCounts() {
        List<Map<String, Object>> currentMonthIncidentCounts = incidentService.getCurrentMonthIncidentCounts();
        return new ResponseEntity<>(currentMonthIncidentCounts, HttpStatus.OK);
    }

    //get Tickets Raised Per Month
    /*@GetMapping("/tickets-raised-per-month")
    public ResponseEntity<List<Map<String, Object>>> getTicketsRaisedPerMonth() {
        List<Map<String, Object>> result = incidentService.getTicketsRaisedPerMonth();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }*/
    @GetMapping("tickets-raised-per-month")
    public Map<String, Long> getTicketRaisedPerIncident() {
        return incidentService.getTicketRaisedPerIncident();
    }

    //count Events PerAnalyst
    @GetMapping("/events-per-analyst")
    public Map<String, Long> getEventsPerAnalyst() {
        return incidentService.countEventsPerAnalyst();
    }

    //Number of alerts per plant
    @GetMapping("/count-by-plant-and-month")
    public ResponseEntity<Map<String, Map<String, Long>>> getIncidentCountByPlantNameAndMonth() {
        Map<String, Map<String, Long>> incidentCountByPlantNameAndMonth = incidentService.getIncidentCountByPlantNameAndMonth();
        return new ResponseEntity<>(incidentCountByPlantNameAndMonth, HttpStatus.OK);
    }

    //Number of treated incidents by severity
    @GetMapping("/count-by-severity-level")
    public List<Object[]> countIncidentsBySeverityLevelForCurrentMonth() {
        return incidentService.countIncidentsBySeverityLevelForCurrentMonth();
    }

    //Yearly
//Number of Incident this  year
    @GetMapping("/incident/count/currentYear")
    public int getIncidentCountForCurrentYear() {
        return incidentService.countIncidentsForCurrentYear();
    }
    //Tickets Raised /incident
@GetMapping("/tickets-raised-in-current-year")
public ResponseEntity<List<Map<String, Object>>> getTicketsRaisedInCurrentYear() {
    List<Map<String, Object>> result = incidentService.getTicketsRaisedInCurrentYear();
    return new ResponseEntity<>(result, HttpStatus.OK);
}

    //Number of Events per analyst
   /* @GetMapping("/analyst-count-in-current-year")
    public List<Object[]> getIncidentCountPerAnalystForCurrentYear() {
        return incidentService.getIncidentCountPerAnalystForCurrentYear();
    }*/
    //Number of incidents per month of the current year
    @GetMapping("/count-per-month")
    public List<Object[]> countIncidentsPerMonth() {
        return incidentService.countIncidentsPerMonth();
    }
    @GetMapping("/countByCategory")
    public ResponseEntity<Map<String, Long>> countIncidentsByCategory() {
        Map<String, Long> incidentCountsByCategory = new HashMap<>();
        List<Object[]> counts = incidentrepository.countIncidentsByCategory();
        for (Object[] row : counts) {
            incidentCountsByCategory.put((String) row[0], (Long) row[1]);
        }
        return ResponseEntity.ok(incidentCountsByCategory);
    }

    @GetMapping("/countByRaisedBy")
    public ResponseEntity<Map<String, Long>> countIncidentsByRaisedBy() {
        Map<String, Long> incidentCountsByRaisedBy = new HashMap<>();
        List<Object[]> counts = incidentrepository.countIncidentsByRaisedBy();
        for (Object[] row : counts) {
            incidentCountsByRaisedBy.put((String) row[0], (Long) row[1]);
        }
        return ResponseEntity.ok(incidentCountsByRaisedBy);
    }
}