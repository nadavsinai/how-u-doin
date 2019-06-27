import {Component, OnInit} from '@angular/core';
import {defer, Observable} from 'rxjs';
import {CasualtiesService} from '@shared/services';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-incident-management',
  templateUrl: './incident-management.component.html',
  styleUrls: ['./incident-management.component.css']
})
export class IncidentManagementComponent implements OnInit {
  private currentIncidentID: string;
  casualtiesNumber$: Observable<number> = defer(() => this.casualtiesSvc.getAllCasualties(this.currentIncidentID)
    .pipe(map((casualties) => {
      return casualties.length;
    })));


  constructor(
    private casualtiesSvc: CasualtiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentIncidentID = this.activatedRoute.params['incidentID'];
  }

  ngOnInit() {
  }

}
