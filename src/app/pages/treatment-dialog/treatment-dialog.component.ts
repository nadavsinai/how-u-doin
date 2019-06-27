import { CasualtiesService } from './../../shared/services/casualties.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Status, Severity, Casualty } from '../../shared/interfaces/incident.interface';
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
  position: Position = null;

  constructor(private casualtySvc: CasualtiesService, private locationSvc: GeolocationService) { }

  readCasualtyData(id: string) {
    this.casualtySvc.getCasualty('0', id).then(casualty => {
      this.casualty = casualty;
      if (this.casualty && this.casualty.treatments.length > 0) {
        this.formGroup.patchValue({statusss: this.casualty.treatments[0].status, severity: this.casualty.treatments[0].severity});
      }
      });
  }

  ngOnInit() {
    this.formGroup.get('id').valueChanges
    .pipe(debounceTime(200))
    .subscribe((value) => this.readCasualtyData(value));
    this.locationSvc.getLocation().then(position => {
      this.position = position;
      this.formGroup.patchValue({location: this.position.coords.latitude + ', ' + this.position.coords.longitude,
      time: new Date(this.position.timestamp).toString()});
    });
  }
}
