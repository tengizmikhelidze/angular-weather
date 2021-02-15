import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GetWeatherService {
  constructor(private http: HttpClient) { }

  get(city: string = 'tbilisi') : Observable<{}[]>{
    const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=95bd999ad2177356216f7a43b4975d3b`;
    return this.http.get<{}[]>(URL);
  }
}
