import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherIconService {
  private URL = `http://openweathermap.org/img/wn/` //10d@2x.png
  constructor(private http: HttpClient) { }
  getIcon(id){
    return this.http.get(this.URL + id + `@2x.png`);
  }
}
