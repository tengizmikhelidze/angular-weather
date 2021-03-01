import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public showLoader : BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }
}
