import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '@app-core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/models/comunes.model';
import { ConfirmarService } from 'src/app/modules/shared/services/confirmar.service';
import { CrearEditarComponent } from '../crear-editar/crear-editar.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Users[] | any = [];
  displayedColumns: string[] = ['name', 'userName', 'actions'];
  loading = true;

  constructor(
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private confirmar: ConfirmarService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  openDialog(data: Users | null = null): void {
    const dialogRef = this.dialog.open(CrearEditarComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.cargarUsuarios();
      }
    });
  }

  cargarUsuarios() {
    this.loading = true;
    this.spinner.show();

    this.api.usersList().toPromise().then(res => {
      console.log(res);
      this.usuarios = res;
      this.loading = true;
    }).finally(() => {
      this.spinner.hide()
      this.loading = false;
    });
  }

  editar(fila: Users) {
    this.openDialog(fila);
  }

  eliminar(fila: Users) {
    this.confirmar.mostrarSimple('Eliminar usuario', `¿Desea eliminar el usuario ${fila.name}?`).toPromise().then(res => {
      if(res) {
        this.api.usersDelete(fila.id || '').toPromise().then(() => {
          this.cargarUsuarios();
        });
      }
    });
  }

}
