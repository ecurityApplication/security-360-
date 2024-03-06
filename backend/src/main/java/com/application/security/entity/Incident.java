package com.application.security.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import java.io.Serializable;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Incident implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
     private String title;
    //private List<String> severityLevel = new ArrayList<>();
    //private List<String> category = new ArrayList<>();
    private String incidentID;
    //private List<String> ticketRaised = new ArrayList<>();
    //private List<String> plantName = new ArrayList<>();
    //private List<String> raisedBy = new ArrayList<>();
    private String hostName;
    private String userName;
    // private String[] Incident_type;
    // private String Date ;
    // private String title ;
    // private String[] Severity_level;
    // private String[] Category;
    // private String Incident_ID;
    // private String[] Ticket_raised;
    // private String[] Plant_Name;
    // private String[] Raised_by;
    // private String Host_Name;
    // private String User_Name;
    // private String[] Host_status;
    // private String Investigation;
    // private String Remediation;
    // private String First_event;
    // private String Acknowledge;
    // private String Time_Analyse;
    // private String[] Analyst;
    // private String Reviewer;
    // private String[] Remediation_Owner;
    // private String Date_Target;
    // private String[] Escalation;
    // private String[] Incident_Status;
    // private String[] False_Positive;
}
