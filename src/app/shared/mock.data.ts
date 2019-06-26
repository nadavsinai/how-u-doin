import {Casualty, Incident, Severity, Status, Treatment} from '@shared/interfaces';
import {firestore} from 'firebase/app';

export const MockTreatments: Treatment[] = [
  {
    id: '',
    status: Status.field,
    reportedBy: 'someone',
    severity: Severity.high,
    treatmentNotes: [],
    timestamp: firestore.Timestamp.now(),
    location: new firestore.GeoPoint(40, 30)
  },
  {
    id: '',
    status: Status.field,
    reportedBy: 'someone',
    severity: Severity.fatal,
    treatmentNotes: ['he is dead'],
    timestamp: firestore.Timestamp.fromMillis(Date.now() + 10000),
    location: new firestore.GeoPoint(40, 30)
  }
];
const MockCasualties: Casualty[] = [{id: '111', treatments: MockTreatments}];

export const mockIncident: Incident = {
  id: 'a',
  location: new firestore.GeoPoint(40, 30),
  timestamp: firestore.Timestamp.now(),
  reportedBy: 'someone',
  displayName: 'tsunami',
  casualties: MockCasualties
};


