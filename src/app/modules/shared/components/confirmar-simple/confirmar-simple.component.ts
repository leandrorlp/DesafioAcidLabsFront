import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmarSimpleData } from 'src/app/models/shared/shared.model';

@Component({
  selector: 'app-confirmar-simple',
  templateUrl: './confirmar-simple.component.html',
  styleUrls: ['./confirmar-simple.component.scss']
})
export class ConfirmarSimpleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmarSimpleData,
    public dialogRef: MatDialogRef<ConfirmarSimpleComponent>,
    ) { }

  ngOnInit() {
  }

  aceptar() {
    this.dialogRef.close(true);
  }

}
