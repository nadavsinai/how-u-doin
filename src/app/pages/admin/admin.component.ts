import {Casualty, Incident} from '@shared/interfaces';
import {Component, OnInit} from '@angular/core';
import {CasualtiesService, IncidentsService} from '@shared/services';
import {startWith, switchMap, take} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentIncident: Incident & { id: string };
  incidentControl = new FormControl();
  private casualties$: Observable<Casualty[]>;


  constructor(public incidentsService: IncidentsService, private casualtySvc: CasualtiesService) {
  }

  ngOnInit() {
    this.incidentsService.allIncidents$.pipe(take(1)).subscribe((incidents) => {
      this.setIncident(incidents[incidents.length - 1]);
    });
    this.casualties$ = this.incidentControl.valueChanges.pipe(startWith([]), switchMap((incident) =>
      this.casualtySvc.getAllCasualties(incident.id)
    ));
  }

  private setIncident(incident: Incident & { id: string }) {
    this.currentIncident = incident;
    this.incidentControl.setValue(incident);
  }
}
