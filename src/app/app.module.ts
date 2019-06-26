// Modules 3rd party
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule
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
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AdminComponent } from './pages/admin/admin.component';
import { MapComponent } from './pages/admin/map/map.component';
import { TableComponent } from './pages/admin/table/table.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
    MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
    MatCardModule, MatTabsModule, MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ProfileModule,
    AngularFirestoreModule,
    NgxAuthFirebaseUIModule.forRoot(firebaseKeys)
  ],
  providers: [
    UserService,
    AlertService,
    AuthGuardService,
    AuthService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
