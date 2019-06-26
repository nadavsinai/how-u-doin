import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [`
    mat-card-content,mat-card-title{
      display: flex;
      justify-content: center;
    }
    button.reportBtn {
      
    }
    button.goToTop {
    position: fixed;
    bottom: 70px;
    float: right;
    right: 10px;
    z-index: 10;
  }`]
})

export class HomeComponent {

  public onToTop(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  onBtnClick() {
    console.log('here')
  }
}
