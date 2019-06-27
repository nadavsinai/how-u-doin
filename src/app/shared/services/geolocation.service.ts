import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  currentLocation: Position;
  private watcher: number;

  constructor() {
  }

  getLocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition((position: Position) => {
        this.currentLocation = position;
        resolve(this.currentLocation);
      }, reject);
    });

  }

  watchPosition() {
    if (!this.watcher) {
      this.watcher = window.navigator.geolocation.watchPosition((position: Position) => {
        this.currentLocation = position;
      }, this.geoError);
    }
  }

  private geoError(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  unwatchPosition() {
    window.navigator.geolocation.clearWatch(this.watcher);
  }
}
