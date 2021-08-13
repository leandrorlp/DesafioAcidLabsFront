import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask'

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    CdkTreeModule,
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    FontAwesomeModule
  ],
  exports: [
    ReactiveFormsModule,
    CdkTreeModule,
    FormsModule,
    NgxMaskModule,
    NgSelectModule,
    FontAwesomeModule
  ]
})
export class InterfazModule { }
