import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {Casualty, Severity, Status, Treatment} from '@shared/interfaces';
import {firestore} from 'firebase/app';
import {GeolocationService} from '@shared/services/geolocation.service';
import {UserService} from '@shared/services/user.service';
import {map, switchMap} from 'rxjs/operators';

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


  addCasualty(incident: string, id: string): Promise<firestore.DocumentReference> {
    const casualty: Casualty = {
      id
    };
    return this.getCollection(incident).add(casualty);
  }

  async addTreatment(incident: string, casualtyID: string, treatmentNotes: string[], severity: Severity, status: Status) {
    let casualtyRef = this.getCollection(incident).doc<Casualty>(casualtyID).ref;

    if (!(await casualtyRef.get()).exists) {
      casualtyRef = await this.addCasualty(incident, casualtyID);
    }
    const currentLocation = await this.geoLocation.getLocation();
    const newTreatment: Treatment = {
      treatmentNotes: treatmentNotes,
      severity: severity,
      reportedBy: this.userService.currentUser.uid,
      status: status,
      location: new firestore.GeoPoint(currentLocation.coords.latitude, currentLocation.coords.longitude),
      timestamp: firestore.Timestamp.fromMillis(currentLocation.timestamp),
    };
    return casualtyRef.collection('treatments').add(newTreatment);
  }

  getCasualty(incidentID: string, id: string) {
    return this.getCollection(incidentID).doc<Casualty>(id);
  }

  getCasualityWithTreatments(incidentID: string, id: string) {
    const ref = this.getCasualty(incidentID, id);
    return ref.valueChanges().pipe(
      switchMap((casualty) => {
        return ref.collection('treatments').valueChanges().pipe(
          map(treatments => ({...casualty, treatments: treatments}))
        );
      }));

    public async getCasualty(incidentID: string, id: string): Promise<Casualty> {
    let casualty: Casualty = {id: "", treatments: []};
    const casualtyQry = this.getCollection(incidentID).doc<Casualty>(id);
    const casualtyDoc = await casualtyQry.get().toPromise();
    if (!casualtyDoc.exists) return casualty;
    casualty.id = casualtyDoc.id;
    const treatments = casualtyQry.collection('treatments');
    const treatmentsDoc = await treatments.get().toPromise();
    const qry = await treatmentsDoc.query.orderBy('timestamp', 'desc').get();
    qry.forEach((treatment) => {casualty.treatments.push(treatment.data() as Treatment)});
    return casualty;
  }
}
