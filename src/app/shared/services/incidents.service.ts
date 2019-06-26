import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Incident} from '@shared/interfaces';
import {firestore} from 'firebase/app';
import {GeolocationService,} from '@shared/services/geolocation.service';
import {UserService} from '@shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  public allIncidents$ = this.getCollection().valueChanges();

  private getCollection() {
    return this.db.collection('/incidents');
  }

  constructor(private db: AngularFirestore, private geoLocation: GeolocationService, private userService: UserService) {

  }

  async addIncident(): Promise<firestore.DocumentReference> {
    const currentLocation = await this.geoLocation.getLocation();
    const incident: Incident = {
      location: new firestore.GeoPoint(currentLocation.coords.latitude, currentLocation.coords.longitude),
      reportedBy: this.userService.currentUser.uid, // uid;
      reportingTime: firestore.Timestamp.fromMillis(currentLocation.timestamp),
      casualties: []
    };
    return this.getCollection().add(incident);
  }

  getIncident$(id: string) {
    return this.getCollection().doc(id).valueChanges();
  }
}
