import { Casualty } from './../../../shared/interfaces/incident.interface';
import { Component, OnInit ,Input} from '@angular/core';
import {Location} from '@shared/interfaces'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() cords:Location;
  @Input() casualties:Casualty[];

  constructor() { }

  ngOnInit() {
  }

}
