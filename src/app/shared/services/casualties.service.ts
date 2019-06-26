import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Casualty, Incident, Severity, Status, Treatment} from '@shared/interfaces';
import {firestore} from 'firebase';
import {GeolocationService} from '@shared/services/geolocation.service';
import {UserService} from '@shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CasualtiesService {
  constructor(private db: AngularFirestore, private geoLocation: GeolocationService, private userService: UserService) {
  }

  private getCollection(incident: string) {
    return this.db.collection(`/incidents/${incident}`);
  }

  public getAllCasualties(incident: string) {
    return this.getCollection(incident).valueChanges();
  }


  async addCasualty(incident: string, id: string): Promise<firestore.DocumentReference> {
    const position: Position = await this.geoLocation.getLocation();
    const casualty: Casualty = {
      id,
      treatments: []
    };
    return this.getCollection(incident).add(casualty);
  }

  async addTreatment(incident: string, casualtyID: string, treatmentNotes: string[], severity: Severity, status: Status) {
    let casualtyDoc = await this.getCollection(incident).doc<Casualty>(casualtyID).get().toPromise();
    if (!casualtyDoc.exists) {
      const casualtyRef = await this.addCasualty(incident, casualtyID);
      casualtyDoc = await casualtyRef.get();
    }
    const casualty = casualtyDoc.data() as Casualty;
    const currentLocation = await this.geoLocation.getLocation();
    const newTreatment: Treatment = {
      treatmentNotes: treatmentNotes,
      severity: severity,
      reportedBy: this.userService.currentUser.uid,
      status: status,
      location: new firestore.GeoPoint(currentLocation.coords.latitude, currentLocation.coords.longitude),
      timestamp: firestore.Timestamp.fromMillis(currentLocation.timestamp),
    };
    return casualtyDoc.ref.update({treatments: [...casualty.treatments, newTreatment]});
  }

  getCatuality(incidentID: string, id: string) {
    return this.getCollection(incidentID).doc(id);
  }
}
