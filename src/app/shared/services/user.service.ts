import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '@shared/services/auth.service';

@Injectable()
export class UserService {
  currentUser: firebase.User | undefined;

  constructor(private alertService: AlertService, private db: AngularFirestore, private authService: AuthService) {
    this.authService.auth.authState.subscribe((user) => this.currentUser = user);
  }

  public updateUserInfo(uid: string, displayName: string, bio: string): Promise<void> {
    return this.db.doc('users/' + uid).update({
      displayName: displayName,
      bio: bio
    });
  }

  public contactFormSend(
    company: string,
    firstname: string,
    lastname: string,
    address: string,
    city: string,
    postal: string,
    message: string
  ) {
    this.alertService.showToaster('This contact form is saved');
    return this.db.collection('contactform/').add({
      company: company,
      firstname: firstname,
      lastname: lastname,
      address: address,
      city: city,
      postal: postal,
      message: message
    });
  }


  public verificationUserEmail(): Promise<void> {
    return this.currentUser.sendEmailVerification().then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }

  public sendUserPasswordResetEmail(): Promise<void> {
    return this.authService.auth.auth.sendPasswordResetEmail(this.currentUser.email).then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }

}
