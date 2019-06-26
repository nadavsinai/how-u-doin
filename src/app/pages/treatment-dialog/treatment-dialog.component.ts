import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Status, Severity } from '../../shared/interfaces/incident.interface';

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

  constructor() { }

  ngOnInit() {
    this.formGroup.get('id').valueChanges
    .pipe(debounceTime(200))
    .subscribe((value)=>{
      console.log(value);
    })
  }
}
