import { Component } from '@angular/core';
import { AuthService, AlertService } from '../../services';
import {auth} from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isAuthenticated: string;
  public angularImage: string = '/assets/img/incident.svg';

  public menuItems: Object[] = []

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    ) {
      this.isAuthenticated = this.authService.isAuthenticated()
  }

  public userUid(): string {
    return auth().currentUser.uid;
  }

  public userEmail(): string {
    return auth().currentUser.email;
  }

  public userName(): string {
    return auth().currentUser.displayName;
  }

  public onLogout(): void {
    this.alertService.showToaster('Logout succesful');
    return this.authService.logout();
  }
}
