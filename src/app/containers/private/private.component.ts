import { formatNumber } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, EMPTY, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: any) {
    if(this.inactivo) {
      this.cerrarSpinner();
    }
  }
  minutos = 0;
  segundos = 0;
  minutosBackup = 0;
  contador: Observable<any> = EMPTY;
  suscripcion: Subscription = EMPTY.subscribe();
  inactivo = false;
  timeOut = 5;
  idleTime = 1;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private idle: Idle,
    private titleService: Title,
    private keepalive: Keepalive
    ) {
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.setIdle(this.idleTime * 60);
      idle.setTimeout(this.timeOut * 60);
      this.minutosBackup = this.timeOut - this.idleTime;

      this.contador = timer(1000, 1000);

      idle.onIdleStart.subscribe(() => {
        this.reset();
        this.spinner.show('sesion');
      });

      idle.onInterrupt.subscribe(() => {
        this.cerrarSpinner();
      });

      idle.onIdleEnd.subscribe(() => {
        this.cerrarSpinner();
      });

      idle.onTimeout.subscribe(() => {
        this.cerrarSpinner();
      });

      idle.watch();
      keepalive.start();
     }

     cerrarSpinner() {
       this.spinner.hide('sesion');
       this.titleService.setTitle('Desafio');
       this.inactivo = false;
     }

     reset() {
      this.minutos = this.minutosBackup;
      this.segundos = 0;
      this.inactivo = true;
    }

    suscribirContador() {
      this.suscripcion = this.contador.subscribe(() => {
        if(this.inactivo) {
          this.titleService.setTitle(formatNumber(this.minutos, 'es-CL', '2.0-0') + ':' + formatNumber(this.segundos, 'es-CL', '2.0-0') + ' para cerrar su sesión');
          this.segundos--;

          if(!this.minutos && this.segundos < 0) {
            this.cerrarSesion();
            this.titleService.setTitle('Desafio');
          }

          if (this.segundos < 0) {
            this.minutos--;
            this.segundos = 59;
          }
        }
      });
    }

    cerrarSesion() {
       this.toastr.warning('La sesión expiro por inactividad', 'Sesion expiro', {
         disableTimeOut: true,
         tapToDismiss: true
       });
       localStorage.removeItem('token');
       localStorage.removeItem('refresh-token');
       this.inactivo = false;

       this.router.navigateByUrl('/login');
    }

  ngOnInit() {
    this.suscribirContador();

    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {
        this.spinner.show();
      }

      if (event instanceof NavigationEnd) {
        this.spinner.hide();
      }

      if (event instanceof NavigationCancel) {
        this.spinner.hide();
      }
      if (event instanceof NavigationError) {
        this.spinner.hide();
      }
    });
  }

}
