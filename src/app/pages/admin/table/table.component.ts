import {Component, Input, OnInit} from '@angular/core';
import {Time} from '@angular/common';
import {Incident, Status, Severity, Casualty} from '../../../shared/interfaces/incident.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit {
  @Input() casualties: Casualty[];
  displayedColumns: string[] = ['id', 'status', 'severity', 'treatmentNotes']; //nextTreatmentIn

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.casualties);
  }

}
