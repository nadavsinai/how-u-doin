import {Component, OnInit} from '@angular/core';
import {IncidentsService} from '@shared/services';

@Component({
  selector: 'app-incident-selection',
  templateUrl: './incident-selection.component.html',
  styleUrls: ['./incident-selection.component.css']
})
export class IncidentSelectionComponent implements OnInit {
  // currentIncidents: Incident[] = [mockIncident];
  // currentIncidents$ = this.incidentsSvs.recentIncidents$; //todo make this query
  currentIncidents$ = this.incidentsSvs.allIncidents$;

  constructor(private incidentsSvs: IncidentsService) {
  }

  ngOnInit() {

  }

}
