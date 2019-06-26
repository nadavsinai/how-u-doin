import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  public token: string;

  constructor(
    private router: Router,
    public auth: AngularFireAuth) {

  }

  public onSuccess = async () => {
    try {
      this.token = await this.getIdToken();
    } catch (e) {
      console.log(e);
    }
    return this.router.navigate(['/']);
  };

  public async logout(): Promise<boolean> {
    this.token = null;
    await this.auth.auth.signOut();
    return this.router.navigate(['/']);
  }

  public getIdToken(): Promise<string> {
    return this.auth.auth.currentUser.getIdToken();
  }

  public isAuthenticated(): boolean {
    return this.token != null;
  }
}
