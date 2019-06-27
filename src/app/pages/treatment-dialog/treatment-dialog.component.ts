import {CasualtiesService, GeolocationService} from '@shared/services';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
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
  private position: Position;

  constructor(private casualtySvc: CasualtiesService, private geoLocationService: GeolocationService) {
  }

  ngOnDestory() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

  }

  readCasualtyData(id: string) {
    return this.casualtySvc.getCasualty(this.incidentID, id).valueChanges();
  }

  addTreatment() {
    let newTreatment: Partial<Treatment> = {
      severity: this.formGroup.value['severity'] as Severity,
      status: this.formGroup.value['statusss'] as Status,
      treatmentNotes: this.formGroup.value['notes'],
    };
    this.casualtySvc.addTreatment(this.incidentID, this.formGroup.value['id'], newTreatment as Treatment,this.position);
  }

  ngOnInit() {
    this.subscriptions.push(this.formGroup.get('id').valueChanges
      .pipe(
        debounceTime(200),
        filter(Boolean),
        distinctUntilChanged(),
        switchMap((id => this.readCasualtyData(id))
        ))
      .subscribe(casualtyDoc => {
        if (casualtyDoc && casualtyDoc.treatments.length > 0) {
          this.treatments = casualtyDoc.treatments;
          const lastTreatment = this.treatments[this.treatments.length - 1];
          this.formGroup.patchValue({statusss: lastTreatment.status, severity: lastTreatment.severity, notes: lastTreatment.treatmentNotes});
        } else {
          this.treatments = [];
        }
      }));
    this.subscriptions.push(this.geoLocationService.watchPosition()
      .subscribe((position: Position) => {
        if (position) {
          this.position = position;
          this.formGroup.patchValue({location: position.coords.latitude + ', ' + position.coords.longitude});
        }
      }));
  }
}
