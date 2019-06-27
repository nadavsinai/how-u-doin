import {CasualtiesService, GeolocationService} from '@shared/services';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Severity, Status, Treatment} from '@shared/interfaces';
import {Subscription} from 'rxjs';

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
    pastTreats: new FormControl(),
  });

  statuses = Object.values(Status);
  severities = Object.values(Severity);
  private subscriptions: Subscription[] = [];
  @Input() incidentID: string;
  treatments: Treatment[] = [];

  constructor(private casualtySvc: CasualtiesService, private geoLocationService: GeolocationService) {
  }

  ngOnDestory() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

  }

  readCasualtyData(id: string) {
    if (!id) {
      id = '-1';
    }
    return this.casualtySvc.getCasualty(this.incidentID, id).get();
  }

  addTreatment() {
    let newTreatment: Partial<Treatment> = {
      severity: this.formGroup.value['severity'] as Severity,
      status: this.formGroup.value['statusss'] as Status,
      treatmentNotes: this.formGroup.value['notes'],
    };
    this.casualtySvc.addTreatment(this.incidentID, this.formGroup.value['id'], newTreatment as Treatment);
  }

  ngOnInit() {
    this.subscriptions.push(this.formGroup.get('id').valueChanges
      .pipe(debounceTime(200),
        switchMap((id => this.readCasualtyData(id))
        ))
      .subscribe(casualtyDoc => {
        if (casualtyDoc.exists && casualtyDoc.data().treatments.length > 0) {
          const treatments = casualtyDoc.data().treatments;
          this.treatments = treatments;
          const lastTreatment = treatments[treatments.length - 1];
          this.formGroup.patchValue({statusss: lastTreatment.status, severity: lastTreatment.severity, notes: lastTreatment.treatmentNotes});
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
