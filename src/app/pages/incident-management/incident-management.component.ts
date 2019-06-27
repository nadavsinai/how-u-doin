import {Component, OnInit} from '@angular/core';
import {defer, Observable} from 'rxjs';
import {CasualtiesService, IncidentsService} from '@shared/services';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {firestore} from 'firebase/app' ;
import {CasualtyWithID, Casualty, Incident} from '@shared/interfaces';


@Component({
  selector: 'app-incident-management',
  templateUrl: './incident-management.component.html',
  styleUrls: ['./incident-management.component.css']
})
export class IncidentManagementComponent implements OnInit {
  currentIncidentID: string;

  casualtiesNumber$: Observable<number> = defer(() => this.casualtiesSvc.getAllCasualties(this.currentIncidentID)
    .pipe(map((casualties) => {
      return casualties.length;
    })));
  child: 'map' | 'treatment' = 'treatment';
  private currentIncident$: Observable<Incident>;
  casualties$: Observable<CasualtyWithID[]>;
  myCasualties$: Observable<CasualtyWithID[]>;


  constructor(
    private casualtiesSvc: CasualtiesService,
    private router: Router,
    private incidentService: IncidentsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentIncidentID = this.activatedRoute.snapshot.paramMap.get('incidentID');
    this.currentIncident$ = this.incidentService.getIncident$(this.currentIncidentID);
    this.casualties$ = this.casualtiesSvc.getAllCasualties(this.currentIncidentID);
    this.myCasualties$ = this.casualtiesSvc.getUserCasualties(this.currentIncidentID);

  }

  ngOnInit() {
  }

  setChild(child: 'map' | 'treatment') {
    this.child = child;
  }
}
