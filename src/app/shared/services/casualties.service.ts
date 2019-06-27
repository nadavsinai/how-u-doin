import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {Casualty, TimeStamp, Treatment} from '@shared/interfaces';
import {firestore} from 'firebase/app';
import {GeolocationService} from '@shared/services/geolocation.service';
import {UserService} from '@shared/services/user.service';
import {filter, map, startWith} from 'rxjs/operators';
import {AlertService} from '@shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class CasualtiesService {
  constructor(
    private alertSvc:AlertService,private db: AngularFirestore, private geoLocation: GeolocationService, private userService: UserService) {
  }

  private getCollection(incident: string, query?: (ref: CollectionReference) => Query) {
    return this.db.collection<Casualty>(`/incidents/${incident}/casualties`, query);
  }

  public getAllCasualties(incident: string) {
    return this.getCollection(incident).valueChanges({idField: 'id'});
  }

  public getUserCasualties(incident: string) {
    return this.getCollection(incident).valueChanges().pipe(
      startWith([]),
      map(casualties => {
        return casualties.filter((casualty) => casualty.treatments
          .some((treatment) => treatment.reportedBy === this.userService.currentUser.uid));
      }
    ));
  }


  addCasualty(incident: string, casualtyID: string, firstTreatment: Treatment): Promise<void> {
    const casualty: Casualty = {
      treatments: [firstTreatment]
    };
    return this.getCollection(incident).doc(casualtyID).set(casualty);
  }

  async addTreatment(incident: string, casualtyID: string, treatment: Treatment, position: Position): Promise<void> {
    // const currentLocation = await this.geoLocation.getLocation();
    const newTreatment: Treatment = {
      treatmentNotes: treatment.treatmentNotes,
      severity: treatment.severity,
      reportedBy: this.userService.currentUser.uid,
      status: treatment.status,
      location: new firestore.GeoPoint(position.coords.latitude, position.coords.longitude),
      timestamp: firestore.Timestamp.fromMillis(position.timestamp),
    };
    let casualtyRef = this.getCollection(incident).doc<Casualty>(casualtyID).ref;
    const casualtyDoc = await casualtyRef.get();
    if (!casualtyDoc.exists) {
      return this.addCasualty(incident, casualtyID, newTreatment).then(()=>this.alertSvc.showToaster('Treatment Recorded for new Casualty'));
    } else {
      const allTreatments = casualtyDoc.exists ? [...casualtyDoc.data().treatments, newTreatment] : [newTreatment];
      return casualtyRef.update({treatments: allTreatments}).then(() => {
        this.alertSvc.showToaster('Treatment Recorded!');
      });
    }
  }

  getCasualty(incidentID: string, id: string) {
    return this.getCollection(incidentID).doc<Casualty>(id);
  }

  static printTimeStamp(time:TimeStamp){
    return time.toDate().toLocaleString()
  }


}
