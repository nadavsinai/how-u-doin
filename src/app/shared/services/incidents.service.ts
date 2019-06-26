import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Incident} from '@shared/interfaces';
import {firestore} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  public allIncidents$ = this.getCollection().valueChanges();

  currentLocation: Position;
  private onLocation: PositionCallback = (position: Position) => {
    this.currentLocation = position;
  };

  private getCollection() {
    return this.db.collection('/incidents');
  }

  constructor(private db: AngularFirestore) {
    this.getLocation();
  }

  getLocation() {
    window.navigator.geolocation.getCurrentPosition(this.onLocation.bind(this));
  }

  addIncident(): Promise<firestore.DocumentReference> {
    this.getLocation();
    const incident: Incident = {
      location: new firestore.GeoPoint(this.currentLocation.coords.latitude, this.currentLocation.coords.longitude),
      reportingTime: firestore.Timestamp.fromMillis(this.currentLocation.timestamp),
      casualties: []
    };
    return this.getCollection().add(incident);
  }

  getIncident$(id: string) {
    return this.getCollection().doc(id).valueChanges();
  }
}
