import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { HeaderComponent } from './shared/header/header.component';
import { OpsManagerComponent } from './airlineopsmanager/opsmanager.component';
import { MultimapComponent } from './shared/multimap/multimap.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: MapComponent, canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'mapview', component: MapViewerComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent },
  { path: 'opsmanager', component:OpsManagerComponent},
  {path: 'multimaps', component:MultimapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
