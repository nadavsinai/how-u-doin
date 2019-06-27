import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {Casualty, Treatment} from '@shared/interfaces';
import {firestore} from 'firebase/app';
import {GeolocationService} from '@shared/services/geolocation.service';
import {UserService} from '@shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CasualtiesService {
  constructor(private db: AngularFirestore, private geoLocation: GeolocationService, private userService: UserService) {
  }

  private getCollection(incident: string, query?: (ref: CollectionReference) => Query) {
    return this.db.collection<Casualty>(`/incidents/${incident}/casualties`, query);
  }

  public getAllCasualties(incident: string) {
    return this.getCollection(incident).valueChanges();
  }


  addCasualty(incident: string, casualtyID: string, firstTreatment: Treatment): Promise<void> {
    const casualty: Casualty = {
      treatments: [firstTreatment]
    };
    return this.getCollection(incident).doc(casualtyID).set(casualty);
  }

  async addTreatment(incident: string, casualtyID: string, treatment: Treatment): Promise<void> {
    const currentLocation = await this.geoLocation.getLocation();
    const newTreatment: Treatment = {
      treatmentNotes: treatment.treatmentNotes,
      severity: treatment.severity,
      reportedBy: this.userService.currentUser.uid,
      status: treatment.status,
      location: new firestore.GeoPoint(currentLocation.coords.latitude, currentLocation.coords.longitude),
      timestamp: firestore.Timestamp.fromMillis(currentLocation.timestamp),
    };
    let casualtyRef = this.getCollection(incident).doc<Casualty>(casualtyID).ref;
    const casualtyDoc = await casualtyRef.get();
    if (!casualtyDoc.exists) {
      return this.addCasualty(incident, casualtyID, newTreatment);
    } else {
      const allTreatments = casualtyDoc.exists ? [...casualtyDoc.data().treatments, newTreatment] : [newTreatment];
      return casualtyRef.update({treatments: allTreatments});
    }
  }

  getCasualty(incidentID: string, id: string) {
    return this.getCollection(incidentID).doc<Casualty>(id);
  }


}
