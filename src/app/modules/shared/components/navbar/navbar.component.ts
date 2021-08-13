import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '@app-core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  titulo: string = '';
  verMenu = false;
  oscuro = false;
  pestanaSelected: any | null = null;
  menus: any[] = [
    {
      nombre: 'General',
      children: [
        { nombre: 'Usuarios', url: '/config/usuarios'}
      ]
    }
  ];
  pestanas : any[] = [
    { nombre: 'Configuración', url: '/config', children: this.menus },
  ];

  constructor(
    private theme: ThemeService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.revisarSesion();
    this.irAPestana(this.pestanas[0]);
  }

  abrirMenu() {
    this.verMenu = !this.verMenu;
  }

  cambiarTema() {
    this.theme.change();
    this.oscuro = this.theme.isDarkMode();
  }

  irAPestana(pestana: any) {
    this.pestanaSelected = pestana;
    this.verMenu = true;
  }

  seleccionarPestana(event: any) {
    this.pestanaSelected = this.pestanas[event.index];
  }

  revisarSesion() {
    if(!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
