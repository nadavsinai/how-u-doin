// Modules 3rd party
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// 404 page
import {PageNotFoundComponent} from './pages/not-found/not-found.component';
// Pages
import {HomeComponent} from './pages/home/home.component';
import {ContactComponent} from './pages/contact/contact.component';
import {AuthComponent} from './pages/auth/auth.component';
import {ProfileComponent} from './pages/profile/profile.component';
// Protected
import {AuthGuardService} from '@shared';
import {AdminComponent} from 'src/app/pages/admin/admin.component';
import {IncidentSelectionComponent} from 'src/app/pages/incident-selection/incident-selection.component';
import {TreatmentDialogComponent} from './pages/treatment-dialog/treatment-dialog.component';
import {IncidentManagementComponent} from './pages/incident-management/incident-management.component';
import {MapComponent} from 'src/app/pages/admin/map/map.component';

// Routing
const appRoutes: Routes = [

  // Public pages
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
  {path: 'incident', component: IncidentSelectionComponent, canActivate: [AuthGuardService]},
  {
    path: 'incident/:incidentID', canActivate: [AuthGuardService], component: IncidentManagementComponent, children: [
      {path: 'treatment', component: TreatmentDialogComponent},
      {path: 'map', component: MapComponent}
    ]
  },
  // Protected pages
  // { path: 'profile/:uid/:name', component: ProfileComponent, canActivate: [AuthGuardService] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
