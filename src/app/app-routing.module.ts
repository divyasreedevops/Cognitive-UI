import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { HeaderComponent } from './shared/header/header.component';
import { OpsManagerComponent } from './airlineopsmanager/opsmanager.component';
import { MultimapComponent } from './components/adm/multimap/multimap.component';
import { VideoClipComponent } from './airlineopsmanager/videoclip/clip.component';
import { PansOpsComponent } from './shared/pans-ops/pans-ops.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: LoginComponent, canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'NOTAM-Management', component: MapComponent },
  { path: 'mapViewer', component: MapViewerComponent },
  { path: 'mapview', component: MapViewerComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent },
  { path: 'opsmanager', component:OpsManagerComponent},
  {path:'weather',component:MapComponent, children: [{ path: 'PANS-OPS', component: MapComponent }]},
  {path: 'ADM', component:MultimapComponent , children: [{ path: 'PANS-OPS', component: MapComponent }]},
  { path: 'videoclip', component: VideoClipComponent},
  { path: 'pansop/:id', component: PansOpsComponent},
  { path: 'APM', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
