import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../basicos/material.module";
import { SharedModule } from "../shared/shared.module";
import { MainComponent } from "./components/main/main.component";
import { DashboardRoutingModule } from "./routes/dashboard-routing.module";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: []
})
export class DashboardModule { }
