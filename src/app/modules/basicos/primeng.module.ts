import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {TableModule} from 'primeng/table';
import {ListboxModule} from 'primeng/listbox';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ListboxModule
  ],
  exports: [
    TableModule,
    InputTextModule,
    DropdownModule,
    ListboxModule
  ]
})
export class PrimengModule { }
