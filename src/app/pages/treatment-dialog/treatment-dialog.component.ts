import { CasualtiesService } from './../../shared/services/casualties.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Status, Severity, Casualty } from '../../shared/interfaces/incident.interface';
import { Severity } from '@shared/interfaces';

@Component({
  selector: 'app-treatment-dialog',
  templateUrl: './treatment-dialog.component.html',
  styleUrls: ['./treatment-dialog.component.css']
})
export class TreatmentDialogComponent implements OnInit {
  formGroup = new FormGroup({
    id:new FormControl(),
    location:new FormControl({value:'',disabled:true}),
    time:new FormControl({value:'',disabled:true}),
    severity:new FormControl(),
    statusss:new FormControl(),
  });

  statuses = Object.values(Status);
  severities = Object.values(Severity);
  treatmentList = [];

  constructor(private casualtySvc: CasualtiesService) { }

  async readCasualtyData(id: string) {
    this.treatmentList = [];
    if (id === '') {return;};
    const casualty = this.casualtySvc.getCasualty('0', id);
    const casualtyDoc = await casualty.get().toPromise();
    if (casualtyDoc.exists) {
//      const treatments = (casualtyDoc.data() as Casualty).treatments;
      const treatments = casualty.collection('treatments');
      const treatmentsDoc = await treatments.get().toPromise();
      const qry = await treatmentsDoc.query.orderBy('timestamp', 'desc').get();
      qry.forEach((treatment) => {this.treatmentList.push(treatment.data())});
    }
    if (this.treatmentList.length > 0) {
      this.formGroup.patchValue({statusss: this.treatmentList[0].status, severity: this.treatmentList[0].severity});
    }
  }

  ngOnInit() {
    this.formGroup.get('id').valueChanges
    .pipe(debounceTime(200))
    .subscribe((value) => this.readCasualtyData(value));
  }
}
