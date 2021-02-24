import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GetWeatherService {
  public citySubject : BehaviorSubject<{}[]> = new BehaviorSubject([]);
  constructor(private http: HttpClient) {}

  get(city: string = 'tbilisi') : Observable<{}[]>{
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=95bd999ad2177356216f7a43b4975d3b`;
    return this.http.get<{}[]>(URL).pipe(
      map((info)=>{
        this.citySubject.next(info);
        return info;
      })
    );
  }
  getByChords(lat, lon): Observable<{}[]>{
    const URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=95bd999ad2177356216f7a43b4975d3b`;
    return this.http.get<{}[]>(URL).pipe(
      map((info)=>{
        this.citySubject.next(info);
        return info;
      })
    );
  }
}
