import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cityType } from './cityType';

@Injectable({
  providedIn: 'root'
})
export class GetCitiesService {
  private URL = `https://my-json-server.typicode.com/tengizmikhelidze/cityserver/cities`;
  constructor(private http: HttpClient) { }
  getAll(): Observable<cityType[]>{
    return this.http.get<cityType[]>(this.URL);
  }
}
