import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../basicos/material.module";
import { PrimengModule } from "../basicos/primeng.module";
import { ConfirmarSimpleComponent } from "./components/confirmar-simple/confirmar-simple.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ConfirmarService } from "./services/confirmar.service";

@NgModule({
  declarations: [
    NavbarComponent,
    ConfirmarSimpleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    ConfirmarService
  ]
})
export class SharedModule { }
