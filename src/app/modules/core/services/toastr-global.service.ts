import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrGlobalService {
  constructor(private toastr: ToastrService) {}

  success(response: HttpEvent<any>) {
    if(response instanceof HttpResponse) {
      this.digestSuccess(response);
    }
  }

  error(response: HttpErrorResponse) {
    this.digestError(response);
  }

  private digestSuccess(response: HttpResponse<any>) {
    if (response.status === 0) {
      this.toastr.error('Hubo un error al tratar de procesar su solicitud, revise su conexión a internet.');
    }
  }

  private digestError(response: HttpErrorResponse) {
    if (response.status == 400 || (response.status > 401 && response.status < 500)) {
      if(response.error.validationErrors && response.error.validationErrors.length) {
        this.toastr.warning('Su solicitud no pudo ser procesada');
        return;
      }

      this.toastr.warning('Hubo un error al tratar de procesar su solicitud');
    }
  }
}
