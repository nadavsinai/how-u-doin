import {Component, OnInit, Input} from '@angular/core';
import {Treatment} from '../../../shared/interfaces/incident.interface';
import {CasualtiesService} from '@shared/services';

@Component({
  selector: 'app-treatment-table',
  templateUrl: './treatment-table.component.html',
  styleUrls: ['./treatment-table.component.css']
})
export class TreatmentTableComponent implements OnInit {

  @Input() treatments: Treatment[];
  displayedColumns: string[] = ['timestamp', 'status', 'severity', 'treatmentNotes']; //nextTreatmentIn
  printTimeStamp = CasualtiesService.printTimeStamp;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.treatments = this.treatments.reverse();
  }
}
