import {Component, Input, OnInit} from '@angular/core';
import {Time} from '@angular/common';
import {Incident, Status, Severity, CasualtyWithID, Treatment} from '../../../shared/interfaces/incident.interface';
import { DataSource } from '@angular/cdk/table';

export interface TableElement {
  id: string;
  severity: string;
  status: string;
  treatments: Treatment[];
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit {
  @Input() casualties: CasualtyWithID[];
  displayedColumns: string[] = ['id', 'status', 'severity', 'treatmentNotes']; //nextTreatmentIn
  ELEMENT_DATA: TableElement[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.ELEMENT_DATA = this.casualties.map((casualty) => {
      const lastTreatment = casualty.treatments[casualty.treatments.length - 1];
      return {
        id: casualty.id,
        status: lastTreatment.status,
        severity: lastTreatment.severity,
        treatmentNotes: casualty.treatments[casualty.treatments.length-1].treatmentNotes,
      }
    });
    console.log(this.ELEMENT_DATA);
    this.casualties = this.ELEMENT_DATA;

  }

}
