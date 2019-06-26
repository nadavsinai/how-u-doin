import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import {UserService, AlertService} from '@shared';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('imageAnimation', [

      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(2)',
      })),

      transition('small <=> large', animate('500ms ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-80%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(25px)', offset: 1})
      ]))),
    ]),
  ]
})
export class ProfileComponent implements OnInit {
  public uid = this.userService.currentUser.uid;

  public fullImagePath: string = '/assets/img/mb-bg-04.png';
  public profileTitle: string = 'My profile';

  public state: string = 'small';
  currentUserFromDb$ = this.db.doc('users/' + this.uid).get();
  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private alertService: AlertService) {
  }

  public ngOnInit(){
  }

  public animateImage(): void {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

  public userEmail(): string{
    return this.userService.currentUser.email;
  }

  public onPasswordReset(): void {
    this.userService.sendUserPasswordResetEmail();
    this.alertService.showToaster('Reset password is sent to your email');
  }

}
