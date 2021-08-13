import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ConfirmarSimpleData } from "src/app/models/shared/shared.model";
import { ConfirmarSimpleComponent } from "../components/confirmar-simple/confirmar-simple.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmarService {
  constructor(
    public dialog: MatDialog
  ) { }

  mostrarSimple(titulo: string, mensaje: string): Observable<boolean> {
    const data: ConfirmarSimpleData = {
      titulo: titulo,
      mensaje: mensaje
    };

    return this.dialog.open(ConfirmarSimpleComponent, {
      data: data
    }).afterClosed();
  }
}
