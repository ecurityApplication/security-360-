import { FileHandle } from "./file-handle";
import { User } from "./user";

export class Incident{

 
  id!: number;
  incidentType!:string;
  // date !:Date;
  date: Date = new Date();

  title!: string;
  severityLevel!: string;
  category!: string;
  incidentID!: string;
  ticketRaised!: string;
  plantName!: string;
  raisedBy!: string;
  hostName!: string;
  userName!: string;
  hostStatus!: string;
  investigation!: string;
  remediation!: string;
  firstEvent!: string;
  acknowledge!: string;
  timeAnalyse!: number;
  analyst!:'';
  reviewer!:string;
  remediationOwner!: string;
  // dateTarget!:Date ;
  dateTarget: Date = new Date();

  escalation!: string;
  incidentStatus!: string;
  falsePositive!: string;
  // description!:string;
  // incidentImages!: FileHandle[]
   incidentImages: FileHandle[] = [];
   functionalEscalation!: string;
   herarachicescalation!: string;
   resolutionandrecovery!: string;
   lessonLeraned!: string;
   managementescalation!: string;

  
}

