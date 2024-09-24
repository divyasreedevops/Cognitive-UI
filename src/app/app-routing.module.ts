import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MapViewerComponent } from './map-viewer/map-viewer.component';
import { HeaderComponent } from './shared/header/header.component';
import { OpsManagerComponent } from './airlineopsmanager/opsmanager.component';
import { MultimapComponent } from './shared/multimap/multimap.component';
import { VideoClipComponent } from './airlineopsmanager/videoclip/clip.component';
import { PansOpsComponent } from './shared/pans-ops/pans-ops.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: LoginComponent, canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  // { path: 'PANS-OPS', component: MapComponent },
  { path: 'mapViewer', component: MapViewerComponent },
  { path: 'mapview', component: MapViewerComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent },
  { path: 'opsmanager', component:OpsManagerComponent},
  {path: 'ADM', component:MultimapComponent , children: [{ path: 'PANS-OPS', component: MapComponent }]},
  { path: 'videoclip', component: VideoClipComponent},
  { path: 'pansop/:id', component: PansOpsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
