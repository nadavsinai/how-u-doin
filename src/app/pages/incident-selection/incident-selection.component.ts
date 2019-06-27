import {Component, OnInit} from '@angular/core';
import {IncidentsService} from '@shared/services';
import {MatSelectChange} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-incident-selection',
  templateUrl: './incident-selection.component.html',
  styleUrls: ['./incident-selection.component.css']
})
export class IncidentSelectionComponent implements OnInit {
  // currentIncidents: Incident[] = [mockIncident];
  // currentIncidents$ = this.incidentsSvs.recentIncidents$; //todo make this query
  currentIncidents$ = this.incidentsSvs.allIncidents$;


  constructor(private incidentsSvs: IncidentsService, private router: Router) {
  }

  ngOnInit() {

  }

  async newIncident() {
    const incident = await this.incidentsSvs.addIncident();
    this.router.navigate([`/incident`, incident.id]);
  }

  selectRecentIncident($event: MatSelectChange) {
    this.router.navigate([`/incident`, $event.value.id]);
  }
}
