import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {auth, database} from 'firebase/app';

@Injectable()
export class UserService {

  constructor(private alertService: AlertService) {
  }

  public saveUserInfo(uid: string, name: string, email: string): Promise<string> {
    return database().ref().child('users/' + uid).set({
      name: name,
      email: email
    });
  }

  public updateUserInfo(uid: string, displayName: string, bio: string): Promise<string> {
    return database().ref().child('users/' + uid).update({
      displayName: displayName,
      bio: bio
    });
  }

  public keepInTouch(email: string) {
    this.alertService.showToaster('Your email is saved');
    return database().ref().child('touch/').push({
      email: email
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
    return database().ref().child('contactform/').push({
      company: company,
      firstname: firstname,
      lastname: lastname,
      address: address,
      city: city,
      postal: postal,
      message: message
    });
  }

  public getUserProfileInformation(): void {
    const user = auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }
  }

  public verificationUserEmail(): Promise<void> {
    return auth().currentUser.sendEmailVerification().then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }

  public sendUserPasswordResetEmail(): Promise<void> {
    return auth().sendPasswordResetEmail(auth().currentUser.email).then(() => {
      // Email sent.
    }, (error) => {
      // An error happened.
    });
  }

}
