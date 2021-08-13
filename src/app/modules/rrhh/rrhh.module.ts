import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../basicos/material.module";
import { PrimengModule } from "../basicos/primeng.module";
import { SharedModule } from "../shared/shared.module";
import { MainComponent } from "./components/main/main.component";
import { RrhhRoutingModule } from "./routes/rrhh-routing.module";
import { ComponentesRRHHUsuarios } from "./components/admin-usuarios/index";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { InterfazModule } from "../basicos/interfaz.module";
import { ToastrModule } from "ngx-toastr";
import { CoreModule, ApiService } from "@app-core";

@NgModule({
  declarations: [
    MainComponent,
    ComponentesRRHHUsuarios
  ],
  imports: [
    CommonModule,
    RrhhRoutingModule,
    DragDropModule,
    CoreModule,
    InterfazModule,
    SharedModule,
    PrimengModule,
    ToastrModule.forRoot(),
    MaterialModule
  ],
  providers: [
    ApiService
  ]
})
export class RrhhModule { }
