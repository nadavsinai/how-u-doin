import {Casualty, Severity, Status} from './../../shared/interfaces/incident.interface';
import {Component, OnInit} from '@angular/core';
import {firestore} from 'firebase/app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cords = new firestore.GeoPoint(34, 32);

  casualties: Casualty[] = [{
    treatments: [{
      location: new firestore.GeoPoint(34.01, 32.01),
      timestamp: firestore.Timestamp.now(),
      severity: Severity.fatal,
      reportedBy: 'Sgt. Pepper',
      treatmentNotes: [],
      status: Status.field
    }]
  }];

  constructor() {
  }

  ngOnInit() {
  }

}
