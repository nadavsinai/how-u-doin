import { Component, OnInit, Input } from '@angular/core';
import { Treatment } from '../../../shared/interfaces/incident.interface';

@Component({
  selector: 'app-treatment-table',
  templateUrl: './treatment-table.component.html',
  styleUrls: ['./treatment-table.component.css']
})
export class TreatmentTableComponent implements OnInit {

  @Input() treatments: Treatment[];
  displayedColumns: string[] = ['time', 'status', 'severity', 'treatmentNotes']; //nextTreatmentIn

  constructor() { }

  ngOnInit() {
  }

}
