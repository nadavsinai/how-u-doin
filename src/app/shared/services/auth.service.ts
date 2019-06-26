import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  public token: string;

  constructor(
    private router: Router,
    private auth: AngularFireAuth) {
  }

  public async onSuccess(): Promise<void> {
    sessionStorage.setItem('session-alive', 'true');
    this.token = await this.getIdToken();
    this.router.navigate(['/']);
    console.log('AUTH: ', this.auth);
  }

  public logout(): void {
    sessionStorage.removeItem('session-alive');
    this.token = null;
    this.router.navigate(['/']);
  }

  public getIdToken(): Promise<string> {
    return this.auth.idToken.toPromise()
  }

  public isAuthenticated(): string {
    return sessionStorage.getItem('session-alive');
  }
}
