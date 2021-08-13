import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AutocompleteOffDirective } from "./directives/auto-complete-off.directive";
import { ApiService } from "./services/api.service";
import { InterceptorService } from "./services/interceptor.service";
import { RequestsService } from "./services/requests.service";
import { StyleManagerService } from "./services/style-manager.service";
import { ThemeService } from "./services/theme.service";
import { ToastrGlobalService } from "./services/toastr-global.service";

@NgModule({
  declarations: [
    AutocompleteOffDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RequestsService,
    StyleManagerService,
    ApiService,
    ToastrGlobalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    ThemeService
  ],
  exports: [
    AutocompleteOffDirective
  ]
})
export class CoreModule { }

export * from './services/interceptor.service';
export * from './services/requests.service';
export * from './services/style-manager.service';
export * from './services/theme.service';
export * from './services/api.service';
