import {CasualtiesService, GeolocationService} from '@shared/services';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Severity, Status} from '@shared/interfaces';
import {Subscription} from 'rxjs';
import { Treatment } from '../../shared/interfaces/incident.interface';

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
    notes: new FormControl(),
  });

  statuses = Object.values(Status);
  severities = Object.values(Severity);
  private subscriptions: Subscription[] = [];
  @Input() incidentID: string;

  constructor(private casualtySvc: CasualtiesService, private geoLocationService: GeolocationService) {
  }

  ngOnDestory() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

  }

  readCasualtyData(id: string) {
    return this.casualtySvc.getCasualty(this.incidentID, id).get();
  }

  addTreatment() {
    let newTreatment: Treatment = {
      severity: Severity[this.formGroup.value['severity']],
      status: Status[this.formGroup.value['statusss']],
      treatmentNotes: this.formGroup.value['notes'],
    };
    console.log(newTreatment);
  }

  ngOnInit() {
    this.subscriptions.push(this.formGroup.get('id').valueChanges
      .pipe(debounceTime(200),
        switchMap((id => this.readCasualtyData(id))
        ))
      .subscribe(casualtyDoc => {
        if (casualtyDoc.exists && casualtyDoc.data().treatments.length > 0) {
          const treatments = casualtyDoc.data().treatments;
          const lastTreatment = treatments[treatments.length - 1];
          this.formGroup.patchValue({statusss: lastTreatment.status, severity: lastTreatment.severity});
        }
      }));
    this.subscriptions.push(this.geoLocationService.watchPosition()
      .subscribe((position: Position) => {
        if (position) {
          this.formGroup.patchValue({location: position.coords.latitude + ', ' + position.coords.longitude});
        }
      }));
  }
}
