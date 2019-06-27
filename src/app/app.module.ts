// Modules 3rd party
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTableModule,
  MatRadioModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
// Modules
import {AuthModule} from './pages/auth/auth.module';
import {ProfileModule} from './pages/profile/profile.module';
// Shared
import {AlertService, AuthGuardService, AuthService, FooterComponent, HeaderComponent, UserService} from '@shared';
// Main
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {firebaseKeys} from './firebase.config';
// Pages
import {HomeComponent} from './pages/home/home.component';
import {ContactComponent} from './pages/contact/contact.component';
import {PageNotFoundComponent} from './pages/not-found/not-found.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AdminComponent} from './pages/admin/admin.component';
import {MapComponent} from './pages/admin/map/map.component';
import {TableComponent} from './pages/admin/table/table.component';
import {CasualtiesService, GeolocationService, IncidentsService} from '@shared/services';
import {TreatmentDialogComponent} from './pages/treatment-dialog/treatment-dialog.component';
import {AgmCoreModule} from '@agm/core';
import {IncidentSelectionComponent} from './pages/incident-selection/incident-selection.component';
import {IncidentManagementComponent} from './pages/incident-management/incident-management.component';

// Components

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    AdminComponent,
    MapComponent,
    TableComponent,
    TreatmentDialogComponent,
    IncidentSelectionComponent,
    IncidentManagementComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
    MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
    MatCardModule, MatIconModule, MatTableModule, MatSelectModule,
    FormsModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
    MatCardModule, MatIconModule, MatToolbarModule,
    FormsModule, MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ProfileModule,
    AngularFirestoreModule,
    NgxAuthFirebaseUIModule.forRoot(firebaseKeys),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaivUsyEwoRvQ7kcoeHn6PWHzVFpgau9k'
    })
  ],

  providers: [
    UserService,
    AlertService,
    GeolocationService,
    IncidentsService,
    AuthGuardService,
    AuthService,
    CasualtiesService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
