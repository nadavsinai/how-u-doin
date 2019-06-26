import {Component} from '@angular/core';
import {AuthService} from '@shared';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  providers = ['google'];

  constructor(private authService: AuthService) {
  }

  onSuccess = this.authService.onSuccess;

}
