export type Location = firebase.firestore.GeoPoint;
export type TimeStamp = firebase.firestore.Timestamp;

export enum Severity {
  low = 'low',
  medium = 'medium',
  high = 'high',
  fatal = 'fatal'
}


export interface Incident {
  location: Location;
  reportingTime: TimeStamp
  casualties: Casualty[];
}

export interface Casualty {
  id: string;
  location: Location;
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
  reportedBy: firebase.firestore.DocumentReference, // User
  treatmentNotes: string[];
  status: Status;
}

export enum Role {
  admin = 'admin',
  medic = 'medic',
  reportingUser = 'reportingUser'
}

