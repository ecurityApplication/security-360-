package com.application.security.controller;

import com.application.security.entity.ImageModel;
import com.application.security.entity.Incident;
import com.application.security.entity.User;
import com.application.security.repository.Incidentrepository;
import com.application.security.repository.UserRepository;
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
import java.time.LocalDate;
import java.time.Year;
import java.util.*;

@RestController
@RequestMapping("/api/v1/incidents")

public class IncidentController {
    @Autowired
    IncidentServiceImpl incidentService;
    @Autowired
    Incidentrepository incidentrepository;
    @Autowired
    UserRepository userRepository;

    @GetMapping("/getAll")
    @ResponseBody
    public List<Incident> getAllIncident( @RequestParam(defaultValue = "") String searchKey){
        return incidentService.getAllIncident(searchKey);
    }
    @GetMapping("/getEscalations")
    public List<Incident> getEscalations() {
        return incidentService.getEscalations();
    }
// MTTA Yearly
    @GetMapping("/mtta/low-informationalyear")
    public ResponseEntity<Double> getMTTALowInformational() {
    double mTTA = incidentService.calculateMTTA("low-informational");
    return ResponseEntity.ok(mTTA);
}
    @GetMapping("/mtta/mediumyear")
    public ResponseEntity<Double> getMTTAMedium() {

        double mTTA = incidentService.calculateMTTA("medium");
        return ResponseEntity.ok(mTTA);
    }

    @GetMapping("/mtta/high-criticalyear")
    public ResponseEntity<Double> getMTTAHighCritical() {

        double mTTA = incidentService.calculateMTTA("high-critical");
        return ResponseEntity.ok(mTTA);
    }
//Mttd Yearly
    @GetMapping("/mttd/lowInformationalyear")
    public ResponseEntity<String> getMTTDForLowAndInformational() {
        String mTTD = incidentService.calculateMTTDForLowAndInformational();
        return ResponseEntity.ok(mTTD);
    }

    @GetMapping("/mttd/mediumyear")
    public ResponseEntity<String> getMTTDForMedium() {
        String mTTD = incidentService.calculateMTTDForMedium();
        return ResponseEntity.ok(mTTD);
    }

    @GetMapping("/mttd/highCriticalyear")
    public ResponseEntity<String> getMTTDForHighAndCritical() {
        String mTTD = incidentService.calculateMTTDForHighAndCritical();
        return ResponseEntity.ok(mTTD);
    }
    //Mttr Yearly
    @GetMapping("/mttr/lowInformationalyear")
    public ResponseEntity<String> getMTTRForLowAndInformational() {
        String mTTR = incidentService.calculateMTTRForLowAndInformational();
        return ResponseEntity.ok(mTTR);
    }

    @GetMapping("/mttr/mediumyear")
    public ResponseEntity<String> getMTTRForMedium() {
        String mTTR = incidentService.calculateMTTRForMedium();
        return ResponseEntity.ok(mTTR);
    }

    @GetMapping("/mttr/highCriticalyear")
    public ResponseEntity<String> getMTTRForHighAndCritical() {
        String mTTR = incidentService.calculateMTTRForHighAndCritical();
        return ResponseEntity.ok(mTTR);
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
    //count by category
    @GetMapping("/countByCategory")
    public ResponseEntity<Map<String, Long>> countIncidentsByCategory() {
        Map<String, Long> incidentCountsByCategory = new HashMap<>();
        List<Object[]> counts = incidentrepository.countIncidentsByCategory();
        for (Object[] row : counts) {
            incidentCountsByCategory.put((String) row[0], (Long) row[1]);
        }
        return ResponseEntity.ok(incidentCountsByCategory);
    }
    //count raised by
    @GetMapping("/countByRaisedBy")
    public ResponseEntity<Map<String, Long>> countIncidentsByRaisedBy() {
        Map<String, Long> incidentCountsByRaisedBy = new HashMap<>();
        List<Object[]> counts = incidentrepository.countIncidentsByRaisedBy();
        for (Object[] row : counts) {
            incidentCountsByRaisedBy.put((String) row[0], (Long) row[1]);
        }
        return ResponseEntity.ok(incidentCountsByRaisedBy);
    }

    //get Tickets Raised Per Month
    @GetMapping("tickets-raised-per-month")
    public ResponseEntity<List<Map<String, Object>>> getTicketsRaisedInCurrentMonth() {
        List<Map<String, Object>> result = incidentService.getTicketsRaisedInCurrentMonth();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Tickets Raised /incident
    @GetMapping("/tickets-raised-in-current-year")
    public ResponseEntity<List<Map<String, Object>>> getTicketsRaisedInCurrentYear() {
        List<Map<String, Object>> result = incidentService.getTicketsRaisedInCurrentYear();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //Number of alerts per plant
//    @GetMapping("/count-by-plant-and-month")
//    public ResponseEntity<Map<String, Map<String, Long>>> getIncidentCountByPlantNameAndMonth() {
//        Map<String, Map<String, Long>> incidentCountByPlantNameAndMonth = incidentService.getIncidentCountByPlantNameAndMonth();
//        return new ResponseEntity<>(incidentCountByPlantNameAndMonth, HttpStatus.OK);
//    }
    @GetMapping("/count-by-plant-and-month")
    public ResponseEntity<Map<String, Long>>getIncidentCountByPlantNameAndMonth() {
        Map<String, Long> incidentCountByPlantNameAndMonth = incidentService.getIncidentCountByPlantNameAndMonth();
        return ResponseEntity.ok(incidentCountByPlantNameAndMonth);
    }
    //count Events PerAnalyst monthly
    @GetMapping("/events-per-analyst")
    public ResponseEntity<Map<String, Long>>getNumeventsperanalyst() {
        Map<String, Long> Numeventsperanalyst = incidentService.getNumeventsperanalyst();
        return ResponseEntity.ok(Numeventsperanalyst);
    }
    //count Events PerAnalyst yearly
    @GetMapping("/events-per-analyst-year")
    public ResponseEntity<Map<String, Long>>getNumeventsperanalystCurrentYear() {
        Map<String, Long> Numeventsperanalyst = incidentService.getNumeventsperanalystCurrentYear();
        return ResponseEntity.ok(Numeventsperanalyst);
    }
    //Number of treated incidents by severity per year
    @GetMapping("/severity-level-count-year")
    public ResponseEntity<Map<String, Long>> getIncidentCountBySeverityLevelForCurrentYear() {
        Map<String, Long> incidentCountBySeverityLevel = incidentService.getIncidentCountBySeverityLevelForCurrentYear();
        return ResponseEntity.ok(incidentCountBySeverityLevel);
    }
    //Number of treated incidents by severity per month

    @GetMapping("/count-by-severity-level")
    public ResponseEntity<Map<String, Long>> countIncidentsBySeverityLevelForCurrentMonth() {
        Map<String, Long> incidentCountBySeverityLevel = incidentService.countIncidentsBySeverityLevelForCurrentMonth();
        return ResponseEntity.ok(incidentCountBySeverityLevel);
    }
    //Number of Incident this  year
    @GetMapping("/incident/count/currentYear")
    public int getIncidentCountForCurrentYear() {
        return incidentService.countIncidentsForCurrentYear();
    }

    //Number of Incidents This month
    @GetMapping("/current-month-count")
    public ResponseEntity<Integer> getCurrentMonthIncidentsCount() {
        int incidentsCount = incidentService.getIncidentsCountForCurrentMonth();
        return ResponseEntity.ok(incidentsCount);

    }
    //MTTA
    @GetMapping("/average-time-analyse-current-month")
    public double getAverageTimeAnalyseCurrentMonth() {
        return incidentService.getAverageTimeAnalyseCurrentMonth();
    }

    //MTTA
    @GetMapping("/averageTimeAnalyse-year")
    public Double getAverageTimeAnalyseForCurrentYear() {
        return incidentService.getAverageTimeAnalyseForCurrentYear();
    }




    //MTTR
//    @GetMapping("/average-mttr")
//    public ResponseEntity<Double> getAverageMTTR() {
//        double averageMTTR = incidentService.calculateAverageMTTR();
//        return new ResponseEntity<>(averageMTTR, HttpStatus.OK);
//    }
    //FPR
    @GetMapping("/averageFalsePositiveCurrentMonth")
    public Double getAverageFalsePositiveCurrentMonth() {
        return incidentService.calculateAverageFalsePositiveCurrentMonth();
    }
    //Yearly





    //Number of incidents per month of the current year
    @GetMapping("/count-per-month-current-year")
    public ResponseEntity<Map<String, Integer>> getIncidentCountPerMonthForCurrentYear() {
        Map<String, Integer> incidentCountPerMonth = incidentService.getIncidentCountPerMonthForCurrentYear();
        return new ResponseEntity<>(incidentCountPerMonth, HttpStatus.OK);
    }

//FPR

    @GetMapping("/averageFalsePositiveCurrentYear")
    public Double getAverageFalsePositiveCurrentYear() {
        return incidentService.calculateAverageFalsePositiveCurrentYear();
    }
//MTTR
//MONTHLY






}