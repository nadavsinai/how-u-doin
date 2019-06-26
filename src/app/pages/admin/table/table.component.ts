import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { Incident, Status, Severity } from '../../../shared/interfaces/incident.interface';

export interface TableElement {
  id: number;
  status: string;
  severity: string;
  nextTreatmentIn: number; //timestamp
  treatment: string;
}

const ELEMENT_DATA: TableElement[] = [
  {id: 1, status: Status.field, severity: Severity.low, nextTreatmentIn: 0, treatment: 'band hand'},
  {id: 2, status: Status.inHospital, severity: Severity.high, nextTreatmentIn: 15, treatment: 'heart'},
  {id: 3, status: Status.inTransport, severity: Severity.high, nextTreatmentIn: 30, treatment: 'head'},
  {id: 4, status: Status.evacuated, severity: Severity.medium, nextTreatmentIn: 60, treatment: 'leg' },
  {id: 5, status: Status.evacuated, severity: Severity.low, nextTreatmentIn: 0, treatment: 'leg' },
  {id: 6, status: Status.field, severity: Severity.fatal, nextTreatmentIn: 5, treatment: 'heart' },
  {id: 7, status: Status.field, severity: Severity.low, nextTreatmentIn: 0, treatment: 'bla bla'},
  {id: 8, status: Status.inHospital, severity: Severity.low, nextTreatmentIn: 0, treatment: 'leg'},
  {id: 9, status: Status.inHospital, severity: Severity.medium, nextTreatmentIn: 30, treatment: 'waiting for next mesurments' },
  {id: 10, status: Status.inTransport, severity: Severity.high, nextTreatmentIn: 0, treatment: 'waiting'},
];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'status', 'severity', 'nextTreatmentIn', 'treatment'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
