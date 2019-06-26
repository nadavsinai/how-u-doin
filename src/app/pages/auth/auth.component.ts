import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

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

  public onSuccess() {
    return this.authService.onSuccess();
  }

}
