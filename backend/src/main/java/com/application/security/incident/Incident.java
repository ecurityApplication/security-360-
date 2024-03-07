package com.project.security.incident;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Il est préférable d'initialiser les listes directement lors de leur déclaration
   // private List<String> incidentType = new ArrayList<>();
  //  private Date date;
    private String title;
    //private List<String> severityLevel = new ArrayList<>();
    //private List<String> category = new ArrayList<>();
    private String incidentID;
    //private List<String> ticketRaised = new ArrayList<>();
    //private List<String> plantName = new ArrayList<>();
    //private List<String> raisedBy = new ArrayList<>();
    private String hostName;
    private String userName;
    //private List<String> hostStatus = new ArrayList<>();
//    private String investigation;
//    private String remediation;
//    private String firstEvent;
//    private String acknowledge;
//    private Integer timeAnalyse;
//    private String analyst;
//    private String remediationOwner;
//    private Date dateTarget;
    //private List<String> escalation = new ArrayList<>();
    //private List<String> incidentStatus = new ArrayList<>();
    //private List<String> falsePositive = new ArrayList<>();

    // Constructeur
    /*public Incident(Long id) {
        this.id = id;

        Initialisation de la liste incidentType
        incidentType.add("Major incident");
        incidentType.add("Minor Incident");

        //Initialisation de la liste severityLevel
        severityLevel.add("Informational");
        severityLevel.add("Low");
        severityLevel.add("Medium");
        severityLevel.add("High");
        severityLevel.add("Critical");

        // Initialisation de la liste category
        category.add("Application");
        category.add("Email");

        // Initialisation de la liste ticketRaised
        ticketRaised.add("Yes");
        ticketRaised.add("No");

        // Initialisation de la liste plantName (préalablement définie)
        plantName.add("COFMA");
        plantName.add("COFKT ");
        plantName.add("COFMD ");
        plantName.add("COFTN ");
        plantName.add("COFSHA ");
        plantName.add("COFTJ ");
        plantName.add("COFTT ");
        plantName.add("COFDE ");
        plantName.add("COFGR ");
        plantName.add("COFPT");
        plantName.add("COFCJ");
        plantName.add("COFHN");
        plantName.add("COFLE");
        plantName.add("COFMT");
        plantName.add("COFMX");
        plantName.add("COFUS ");
        plantName.add("COFEE ");
        plantName.add("COFMK");
        plantName.add("COFPL");
        plantName.add("CHAKIRA");
        plantName.add("COFRS");
        plantName.add("CORPORATE ");
        // Initialisation de la liste raisedBy
        raisedBy.add("Crowdstrike");
        raisedBy.add("Proofpoint");
        raisedBy.add("Siem");
        raisedBy.add("FortiAnalyser");
        raisedBy.add("MicrosoftDefender");
        raisedBy.add("Azure");
        // Initialisation de la liste hostStatus
        hostStatus.add("Contained");
        hostStatus.add("NOT-Contained");

        // Initialisation de la liste escalation
        escalation.add("Yes");
        escalation.add("No");

        // Initialisation de la liste incidentStatus
        incidentStatus.add("Closed");
        incidentStatus.add("Open");

        // Initialisation de la liste falsePositive
        falsePositive.add("Yes");
        falsePositive.add("No");
    }*/
}
