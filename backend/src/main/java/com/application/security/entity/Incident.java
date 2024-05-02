package com.application.security.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Temporal(TemporalType.DATE)
    private Long id;
    private String incidentType;
    private Date date;
    private String title;
    private String severityLevel;
    private String category;
    private String incidentID;
    private String ticketRaised;
    private String plantName;
    private String raisedBy;
    private String hostName;
    private String userName;
    private String hostStatus;
    private String investigation;
    private String roadCauseAnalysis;
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
    private String timeOfClosure ;
    private String  falsePositive ;
    private String functionalEscalation;
    private String herarachicescalation;
    private String resolutionandrecovery;
    private String lessonLeraned;
    private String managementescalation;


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

    @ManyToOne(fetch = FetchType.LAZY)//Many incident belongs to the same user
    @JoinColumn(name = "user_id",nullable = false)

    public User user;

    public Incident orElseThrow(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    }
}
