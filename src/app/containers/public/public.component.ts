import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
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
