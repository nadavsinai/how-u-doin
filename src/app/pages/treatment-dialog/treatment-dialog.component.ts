import { CasualtiesService , GeolocationService} from '@shared/services';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { debounceTime , switchMap} from 'rxjs/operators';
import { Casualty, Severity, Status } from '@shared/interfaces';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { GeolocationService } from '../../shared/services/geolocation.service';

@Component({
  selector: 'app-treatment-dialog',
  templateUrl: './treatment-dialog.component.html',
  styleUrls: ['./treatment-dialog.component.css']
})
export class TreatmentDialogComponent implements OnInit {
  formGroup = new FormGroup({
    id: new FormControl(),
    location: new FormControl({value: '', disabled: true}),
    time: new FormControl({value: '', disabled: true}),
    severity: new FormControl(),
    statusss: new FormControl(),
  });

  statuses = Object.values(Status);
  severities = Object.values(Severity);
  casualty: Casualty = null;
  private formSubscriber: Subscription;
  position: Position = null;

  constructor(private casualtySvc: CasualtiesService, private geoLocationService: GeolocationService, private activatedRoute: ActivatedRoute) {
  }

  ngOnDestory() {
    this.formSubscriber.unsubscribe();
    this.geoLocationService.unwatchPosition();
  }

  readCasualtyData(id: string) {
    //todo: replace with activated route incident ID
    return this.casualtySvc.getCasualty(this.activatedRoute.params['incidentID'], id).get();
  }

  ngOnInit() {
    this.geoLocationService.watchPosition();
    this.formSubscriber = this.formGroup.get('id').valueChanges
      .pipe(debounceTime(200),
        switchMap((id => this.readCasualtyData(id))
        ))
      .subscribe(casualty => {
        this.casualty = casualty.data() as Casualty;
        if (this.casualty && this.casualty.treatments.length > 0) {
          this.formGroup.patchValue({statusss: this.casualty.treatments[0].status, severity: this.casualty.treatments[0].severity});
        }
      });
    ;
  }
}
