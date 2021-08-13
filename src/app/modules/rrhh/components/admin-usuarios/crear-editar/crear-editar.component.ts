import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '@app-core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Validation from 'src/app/validators/confirm.password.validator';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.scss']
})
export class CrearEditarComponent implements OnInit {
  form = this.fb.group({
    id: [null],
    userName: [null, Validators.required],
    name: [null, Validators.required],
    password: [null, Validators.required],
    passRepeat: [null, Validators.required],
    active: [true]
  },
  {
    validators: [Validation.confirmPassword("pass", "PassRepeat")]
  });
  tenants: any[] = [];
  enviando = false;

  constructor(
    public dialogRef: MatDialogRef<CrearEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService
  ) { }

  ngOnInit() {
    if(this.data) {
      this.form.patchValue(this.data);
      this.form.controls.userName.setValue(this.data.username);
    }
  }

  guardar() {
    this.mostrarSpinner();
    if(!this.data) {
      this.crear();
      return;
    }

    this.editar();
  }

  editar() {
    const val = this.form.value;
    val.password = Md5.hashStr(val.password || '');
    val.passRepeat = null;

    this.api.usersUpdate(val).toPromise().then(() => {
      this.toastr.show('Cambios guardados');
      this.dialogRef.close(true);
    }).finally(() => this.ocultarSpinner());
  }

  crear() {
    const val = this.form.value;
    val.password = Md5.hashStr(val.password || '');
    val.passRepeat = null;

    this.api.usersCreate(val).toPromise().then(() => {
      this.toastr.show('Cambios guardados');
      this.dialogRef.close(true);
    }).finally(() => this.ocultarSpinner());
  }

  mostrarSpinner() {
    this.spinner.show();
    this.enviando = true;
  }

  ocultarSpinner() {
    this.spinner.hide();
    this.enviando = false;
  }
}
