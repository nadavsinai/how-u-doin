import {Component} from '@angular/core';
import {AuthService, AlertService} from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public logo: string = '/assets/img/incident.svg';

  public menuItems: Object[] = [];

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
  ) {
  }

  public onLogout(): Promise<boolean> {
    this.alertService.showToaster('Logout succesful');
    return this.authService.logout();
  }
}
