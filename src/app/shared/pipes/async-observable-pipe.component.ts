import { Component } from '@angular/core';
import {interval, Observable} from 'rxjs';

@Component({
  selector: 'app-async-observable-pipe',
  template: `
  <fieldset>
    <h3>Async Observable :</h3>
    <h5>
      Count: {{counter$ | async}}
    </h5>
  </fieldset>
  `,
  styles: []
})
export class AsyncObservablePipeComponent {

  public counter$: Observable<number>;

  constructor() {
    this.counter$ = interval(1000);
  }

}
