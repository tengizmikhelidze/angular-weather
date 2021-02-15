import { Component } from '@angular/core';
import { GetWeatherService } from './shared/services/weather/get-weather.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ამინდი';
}
