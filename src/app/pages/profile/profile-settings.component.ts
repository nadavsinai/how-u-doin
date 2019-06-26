import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FirebaseFirestore, FirebaseAuth} from '@angular/fire';
import {AuthService, AlertService, UserService} from '@shared';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  public uid:string;
  public displayName: string = 'Your username';
  public bio: any = 'Your bio';

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private userService: UserService,
    private db:AngularFirestore,
    private auth:AngularFireAuth,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.uid = (await this.auth.user.toPromise()).uid;
    this.db.doc(`users/${this.uid}`).get().toPromise().then((snap) => {
      this.displayName = snap.data().displayName;
      this.bio = snap.data().bio;
    });
  }

  public onPasswordReset(): void {
    this.userService.sendUserPasswordResetEmail();
    this.alertService.showToaster('Reset password is sent to your email');
  }

  public onUpdateUserInfo(form: NgForm): void {
    const displayName = form.value.displayName;
    const bio = form.value.bio;
    this.userService.updateUserInfo(this.uid, displayName, bio);
    this.alertService.showToaster('Your settings are saved');
  }

  public onLogout(): void {
    this.authService.logout();
    this.alertService.showToaster('Logout succesful');
  }

}
