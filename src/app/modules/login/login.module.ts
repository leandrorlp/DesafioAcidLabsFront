import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../basicos/material.module';
import { LoginRoutingModule } from './routes/login-routing.module';
import { InterfazModule } from '../basicos/interfaz.module';
import { CoreModule as FlexCoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { ApiService } from '@app-core';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FlexCoreModule,
    MaterialModule,
    InterfazModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    ApiService
  ]
})
export class LoginModule { }
