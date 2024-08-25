import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ApiService } from './services/api.service';
import { ChartsComponent } from './components/charts/charts.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingComponent,
    LoginComponent,
    UploadFileComponent,
    ChartsComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    NgxFileDropModule,
    FormsModule ,
    MatDialogModule,
    MatButtonModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
  ],
  providers: [
    provideAnimationsAsync(),
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
