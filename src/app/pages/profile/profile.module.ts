// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule,
         MatToolbarModule, MatCardModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

// Components
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule,
    MatToolbarModule, MatCardModule, MatDialogModule,
    FormsModule
  ],
  exports: [
    ProfileComponent,
  ],
  schemas: [
  ]
})
export class ProfileModule {
}
