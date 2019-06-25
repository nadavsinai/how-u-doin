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
  public angularImage: string = '/assets/img/angular2.png';

  public menuItems: Object[] = [
    {
      icon: 'library_books',
      title: 'Medium @jeroenouw',
      link: 'https://medium.com/@jeroenouw'
    },
    {
      icon: 'description',
      title: 'Generated docs',
      link: 'http://ngxmatfire-docs.jerouw.nl/'
    },
    {
      icon: 'description',
      title: 'Features',
      link: 'https://github.com/jeroenouw/AngularMaterialFirebase/blob/master/docs/FEATURES.md'
    },
    {
      icon: 'flight_takeoff',
      title: 'Quick start',
      link: 'https://github.com/jeroenouw/AngularMaterialFirebase/blob/master/docs/DEVELOPER.md'
    },
    {
      icon: 'archive',
      title: 'NPM packages',
      link: 'https://www.npmjs.com/~jeroenouw'
    },
    {
      icon: 'link',
      title: 'Fork on Github',
      link: 'https://github.com/jeroenouw/AngularMaterialFirebase'
    },
  ];

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
