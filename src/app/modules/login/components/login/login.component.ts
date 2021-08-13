import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, ThemeService } from '@app-core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginRequest } from 'src/app/models/comunes.model';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  titulo: string = 'Administración del sistema';
  oscuro = false;
  form = this.fb.group({
    user: [null, Validators.required],
    pass: [null, Validators.required],
  });

  constructor(
    private theme: ThemeService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.oscuro = this.theme.isDarkMode();
  }

  cambiarTema() {
    this.theme.change();
    this.oscuro = this.theme.isDarkMode();
  }

  iniciarSesion() {
    const req: LoginRequest = {
      username: this.form.controls.user.value,
      password: Md5.hashStr(this.form.controls.pass.value)
    };

    this.spinner.show();
    this.api.authLoginCreate(req).toPromise().then((res: any) => {
      localStorage.setItem('token', res.token || '');
      localStorage.setItem('refresh-token', res.refreshToken || '');

      this.router.navigate(['/dashboard']);
    }).finally(() => this.spinner.hide());
  }

}
