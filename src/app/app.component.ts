import { Component, HostListener, OnInit } from '@angular/core';
import { GetWeatherService } from './shared/services/weather/get-weather.service';
import { tap } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // animations: [
  //   trigger('detail', [
  //     transition(':enter', [
  //       style({opacity: 0}),
  //       animate(200)
  //     ]),
  //     transition(':leave', [
  //       style({opacity: 1}),
  //       animate(200, style({
  //         opacity: 0,
  //       }))
  //     ])
  //   ])
  // ]
})
export class AppComponent implements OnInit {
  public title = 'ამინდი';
  public menuVisability = 'block';
  public screenWidth;
  public toggleIsVisible = false;
  public active = '2131';

  ngOnInit() {
    this.getScreenSize();
    if (this.screenWidth < 1020) {
      this.menuVisability = 'none';
      this.toggleIsVisible = true;
    } else {
      this.menuVisability = 'block';
      this.toggleIsVisible = false;
    }
  }
  toggleMenu() {
    if (this.menuVisability === 'none') {
      this.menuVisability = 'block';
    } else {
      this.menuVisability = 'none';
    }
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 1020) {
      this.toggleIsVisible = true;
    } else {
      this.toggleIsVisible = false;
      this.menuVisability = 'block';
    }
  }
}
