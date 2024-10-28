import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './shared/map/map.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';


import { LayoutModule } from '@angular/cdk/layout';
import { HeaderComponent } from './shared/header/header.component';

import { CardComponent } from './components/landing-page/card/card.component';
import { OpsManagerComponent } from './components/landing-page/opsmanager.component';
import { SubheaderComponent } from "./shared/subheader/subheader.component";
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MultimapComponent } from './components/adm/multimap/multimap.component';
import { VideoClipComponent } from './components/landing-page/videoclip/clip.component';
import { SharedService } from 'src/app/service/shared.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NotamTableComponent } from './components/notam/notam-table/notam-table.component';

import { NgxPaginationModule } from 'ngx-pagination'; 
import { AdmSidebarComponent } from './shared/all-sidebar/adm-sidebar/adm-sidebar.component';
import { NotamSidebarComponent } from './shared/all-sidebar/notam-sidebar/notam-sidebar.component';
import { WeatherSidebarComponent } from './shared/all-sidebar/weather-sidebar/weather-sidebar.component';
import { EnroteSidebarComponent } from './shared/all-sidebar/weather-sidebar/enroute/enrote-sidebar/enrote-sidebar/enrote-sidebar.component';
import { WeatherTableComponent } from './components/weather/weather-table/weather-table.component';
import { TerminalComponent } from './shared/all-sidebar/weather-sidebar/terminal/terminal.component';
import { AtsTableComponent } from './components/weather/ats-table/ats-table.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApmSidebarComponent } from './shared/all-sidebar/apm-sidebar/apm-sidebar.component';
import { ApmTableComponent } from './components/apm/apm-table/apm-table.component';
import { WeatherPopupComponent } from './shared/weather-popup/weather-popup.component';

@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        LoginComponent,
        FooterComponent,
        HeaderComponent,
        CardComponent,
        OpsManagerComponent,
        SubheaderComponent,
        SidebarComponent,
        MultimapComponent,
        VideoClipComponent,
        NotamTableComponent,
        AdmSidebarComponent,
        NotamSidebarComponent,
        WeatherSidebarComponent,
        EnroteSidebarComponent,
        WeatherTableComponent,
        TerminalComponent,
        AtsTableComponent,
        LoaderComponent,
        ApmSidebarComponent,
        ApmTableComponent,
        WeatherPopupComponent
    ],
  
    imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    LayoutModule,
    MatSidenavModule,
    NgxPaginationModule,
    MatProgressSpinnerModule
],
    bootstrap: [AppComponent],
    providers: [AuthGuard,SharedService,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
