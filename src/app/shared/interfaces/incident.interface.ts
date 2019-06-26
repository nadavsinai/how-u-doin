import {firestore} from 'firebase';

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
  reportingTime: TimeStamp;
  reportedBy: string // uid;
  casualties?: Casualty[];
}

export interface Casualty {
  id: string;
  treatments: Treatment[];
}

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
}

export enum Role {
  admin = 'admin',
  medic = 'medic',
  reportingUser = 'reportingUser'
}

