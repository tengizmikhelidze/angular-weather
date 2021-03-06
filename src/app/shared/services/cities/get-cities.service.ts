import { Injectable } from '@angular/core';
import { cities } from './cities';
import { cityType } from '../../interfaces/cityType';

@Injectable({
  providedIn: 'root'
})
export class GetCitiesService {
  private cities = cities;
  getAll(): cityType[]{
    return this.cities;
  }
}
