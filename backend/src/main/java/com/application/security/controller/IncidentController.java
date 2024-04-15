package com.application.security.controller;

import com.application.security.entity.ImageModel;
import com.application.security.entity.Incident;
import com.application.security.repository.Incidentrepository;
import com.application.security.services.Impl.IncidentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public List<Incident> getAllIncident(){
        return incidentService.getAllIncident();
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
}