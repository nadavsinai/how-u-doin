import {firestore} from 'firebase/app';

export type Location = firestore.GeoPoint;
export type TimeStamp = firestore.Timestamp;

export enum Severity {
  low = 'low',
  medium = 'medium',
  high = 'high',
  fatal = 'fatal'
}


export interface Incident {
  location: Location;
  timestamp: TimeStamp;
  reportedBy: string; // uid;
  displayName?: string;
}

export interface Casualty {
  treatments: Treatment[]
}

export type CasualtyWithID = Casualty & {id:string};

export enum Status {
  field = 'field',
  inTransport = 'inTransport',
  evacuated = 'evacuated',
  inHospital = 'inHospital'
}

export interface Treatment {
  location: firebase.firestore.GeoPoint;
  timestamp: firebase.firestore.Timestamp;
  severity: Severity;
  reportedBy: string // uid;
  treatmentNotes: string[];
  status: Status;
  NextTreatmentIn?:number;
}

export enum Role {
  admin = 'admin',
  medic = 'medic',
  reportingUser = 'reportingUser'
}

