package com.application.security.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    //private List<String> incidentTypes = new ArrayList<>();





    private String incidentType ;
     @Temporal(TemporalType.DATE)
//    @Temporal(TemporalType.TIMESTAMP)

    private Date date;
    private String title;
    private String severityLevel ;
    private String category ;
    private String incidentID;
    private String ticketRaised ;
    private String plantName ;
    private String raisedBy ;
    private String hostName;
    private String userName;
    private String hostStatus ;
    private String investigation;
    private String remediation;
    private String firstEvent;
    private String acknowledge;
    private Integer timeAnalyse;
    private String analyst;
    private String reviewer;
    private String remediationOwner;

    @Temporal(TemporalType.TIMESTAMP)

    private Date dateTarget;
    private String escalation ;
    private String incidentStatus ;
    private String  falsePositive ;
    @Getter
    @Setter
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "incident_images",
            joinColumns = {
                    @JoinColumn(name = "incident_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "image_id")
            }
    )

    private Set<ImageModel>incidentImages;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIncidentType() {
        return incidentType;
    }

    public void setIncidentType(String incidentType) {
        this.incidentType = incidentType;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSeverityLevel() {
        return severityLevel;
    }

    public void setSeverityLevel(String severityLevel) {
        this.severityLevel = severityLevel;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getIncidentID() {
        return incidentID;
    }

    public void setIncidentID(String incidentID) {
        this.incidentID = incidentID;
    }

    public String getTicketRaised() {
        return ticketRaised;
    }

    public void setTicketRaised(String ticketRaised) {
        this.ticketRaised = ticketRaised;
    }

    public String getPlantName() {
        return plantName;
    }

    public void setPlantName(String plantName) {
        this.plantName = plantName;
    }

    public String getRaisedBy() {
        return raisedBy;
    }

    public void setRaisedBy(String raisedBy) {
        this.raisedBy = raisedBy;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getHostStatus() {
        return hostStatus;
    }

    public void setHostStatus(String hostStatus) {
        this.hostStatus = hostStatus;
    }

    public String getInvestigation() {
        return investigation;
    }

    public void setInvestigation(String investigation) {
        this.investigation = investigation;
    }

    public String getRemediation() {
        return remediation;
    }

    public void setRemediation(String remediation) {
        this.remediation = remediation;
    }

    public String getFirstEvent() {
        return firstEvent;
    }

    public void setFirstEvent(String firstEvent) {
        this.firstEvent = firstEvent;
    }

    public String getAcknowledge() {
        return acknowledge;
    }

    public void setAcknowledge(String acknowledge) {
        this.acknowledge = acknowledge;
    }

    public Integer getTimeAnalyse() {
        return timeAnalyse;
    }

    public void setTimeAnalyse(Integer timeAnalyse) {
        this.timeAnalyse = timeAnalyse;
    }

    public String getAnalyst() {
        return analyst;
    }

    public void setAnalyst(String analyst) {
        this.analyst = analyst;
    }

    public String getReviewer() {
        return reviewer;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public String getRemediationOwner() {
        return remediationOwner;
    }

    public void setRemediationOwner(String remediationOwner) {
        this.remediationOwner = remediationOwner;
    }

    public Date getDateTarget() {
        return dateTarget;
    }

    public void setDateTarget(Date dateTarget) {
        this.dateTarget = dateTarget;
    }

    public String getEscalation() {
        return escalation;
    }

    public void setEscalation(String escalation) {
        this.escalation = escalation;
    }

    public String getIncidentStatus() {
        return incidentStatus;
    }

    public void setIncidentStatus(String incidentStatus) {
        this.incidentStatus = incidentStatus;
    }

    public String getFalsePositive() {
        return falsePositive;
    }

    public void setFalsePositive(String falsePositive) {
        this.falsePositive = falsePositive;
    }

    public Set<ImageModel> getIncidentImages() {
        return incidentImages;
    }

    public void setIncidentImages(Set<ImageModel> incidentImages) {
        this.incidentImages = incidentImages;
    }
//    private String description;
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
        incidentStatus.add("Open");
        incidentStatus.add("Closed");

        // Initialisation de la liste falsePositive
        falsePositive.add("Yes");
        falsePositive.add("No");
    }*/
}
