import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PrivateComponent } from './containers/private/private.component';
import { PublicComponent } from './containers/public/public.component';
import { LoginModule } from './modules/login/login.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './routes/app-routing.module';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SharedModule } from './modules/shared/shared.module';
import { RrhhModule } from './modules/rrhh/rrhh.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { DatePipe, registerLocaleData } from '@angular/common';

import localeCL from '@angular/common/locales/es-CL';
import localeCLExtra from '@angular/common/locales/extra/es-CL';
registerLocaleData(localeCL, localeCLExtra);

@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,
    PublicComponent
  ],
  imports: [
    FlexLayoutModule,
    CdkTreeModule,
    CommonModule,
    BrowserModule,
    SharedModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    LoginModule,
    DashboardModule,
    ToastrModule.forRoot(),
    RrhhModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
