import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {auth} from 'firebase/app';
import { PhoneNumber, AuthService, AlertService } from '@shared';

@Component({
  selector: 'app-phone-signin',
  templateUrl: './phone-signin.component.html',
  styleUrls: ['./phone-signin.component.scss']
})
export class PhoneSigninComponent implements OnInit {
  phoneNumber = new PhoneNumber();
  isAuthenticated: boolean;

  token: string;
  windowRef: any;
  verificationCode: string;
  currentUser: any;

  constructor(
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
      this.isAuthenticated = this.authService.isAuthenticated()
  }

  ngOnInit() {
    (window as any).recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render()
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;
    auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
          this.windowRef.confirmationResult = result;
          this.alertService.showToaster('Login code is send');
      })
      .catch( error => console.log(error) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
        .then((result) => {
          const currentUser = result.user;
        })
        .then(response => {
          this.router.navigate(['/']);
          auth().currentUser.getIdToken()
          .then(
              (token: string) => this.token = token
          );
          this.alertService.showToaster('Login code is entered');
        })
    .catch( error => console.log(error, 'Incorrect code entered?'));
  }
}
