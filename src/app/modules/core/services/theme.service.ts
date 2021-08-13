import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { StyleManagerService } from "./style-manager.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private colorTheme: any;
  private lightPrime = 'mdc-light-indigo';
  private darkPrime = 'mdc-dark-indigo';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
    const tema = localStorage.getItem('user-theme');

    if(tema) {
      this.changePrimeng(tema == 'dark-mode');
    }
  }

  change() {
    this.getColorTheme();
    const nuevoTema = localStorage.getItem('user-theme') == 'dark-mode' ? 'light-mode' : 'dark-mode';
    this.update(nuevoTema);
    this.changePrimeng(nuevoTema == 'dark-mode');
  }

  changePrimeng(oscuro: boolean) {
    let themeElement = document.getElementById('theme-link');

    if(themeElement) {
      const href = themeElement.getAttribute('href');

      if(href) {
        if(oscuro) {
          themeElement.setAttribute('href', href.replace(this.lightPrime, this.darkPrime));
        } else {
          themeElement.setAttribute('href', href.replace(this.darkPrime, this.lightPrime));
        }
      }
    }
  }

  update(theme: any) {
    this.setColorTheme(theme);
    const previousColorTheme =
      theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  isDarkMode() {
    return this.colorTheme === 'dark-mode';
  }

  private setColorTheme(theme: string) {
    this.colorTheme = theme;
    localStorage.setItem('user-theme', theme);
  }

  private getColorTheme() {
    if (localStorage.getItem('user-theme')) {
      this.colorTheme = localStorage.getItem('user-theme');
    } else {
      this.colorTheme = 'light-mode';
      localStorage.setItem('user-theme', 'light-mode');
    }
  }
}
