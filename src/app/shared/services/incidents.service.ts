import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {Incident} from '@shared/interfaces';
import {firestore} from 'firebase/app';
import {GeolocationService,} from '@shared/services/geolocation.service';
import {UserService} from '@shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  public allIncidents$ = this.getCollection().valueChanges({idField: 'id'});
  private static readonly time7daysAgo = new Date((Date.now() - 604800000));
  public recentIncidents$ = this.getCollection((ref) => ref.where('timestamp', '>', IncidentsService.time7daysAgo)).valueChanges();

  private getCollection(query?: (ref: CollectionReference) => Query) {
    return this.db.collection<Incident>('/incidents', query);
  }

  constructor(private db: AngularFirestore, private geoLocation: GeolocationService, private userService: UserService) {

  }

  async addIncident(): Promise<firestore.DocumentReference> {
    const currentLocation = await this.geoLocation.getLocation();
    const incident: Incident = {
      location: new firestore.GeoPoint(currentLocation.coords.latitude, currentLocation.coords.longitude),
      reportedBy: this.userService.currentUser.uid, // uid;
      timestamp: firestore.Timestamp.fromMillis(currentLocation.timestamp),
    };
    return this.getCollection().add(incident);
  }

  getIncident$(id: string) {
    return this.getCollection().doc<Incident>(id).valueChanges();
  }

  printLocation(incident: Incident) {
    return `[${incident.location.latitude}, ${incident.location.longitude}]`;
  }
}
