import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Casualty, Incident, Severity, Status, Treatment} from '@shared/interfaces';
import {firestore} from 'firebase/app';
import {GeolocationService} from '@shared/services/geolocation.service';
import {UserService} from '@shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CasualtiesService {
  constructor(private db: AngularFirestore, private geoLocation: GeolocationService, private userService: UserService) {
  }

  private getCollection(incident: string) {
    return this.db.collection(`/incidents/${incident}/casualties`);
  }

  public getAllCasualties(incident: string) {
    return this.getCollection(incident).valueChanges();
  }


  async addCasualty(incident: string, id: string): Promise<Casualty> {
    this.geoLocation.getLocation().then((position) => {
      const casualty: Casualty = {
        id,
        treatments: []
      };
      this.getCollection(incident).add(casualty);
    });
    return this.getCasualty(incident, id);
  }
/*
  async addTreatment(incident: string, casualtyID: string, treatmentNotes: string[], severity: Severity, status: Status) {
    let casualty = await this.getCasualty(incident, casualtyID);
    if (casualty.id === "") {
      casualty = await this.addCasualty(incident, casualtyID);
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
    return casualtyDoc.ref.update({treatments: [...casualty.treatments, newTreatment]});
  }
*/
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
