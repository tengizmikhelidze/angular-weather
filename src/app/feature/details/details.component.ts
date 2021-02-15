import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { fromEvent, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { cityType } from 'src/app/shared/services/cities/cityType';
import { GetCitiesService } from 'src/app/shared/services/cities/get-cities.service';
import { GetWeatherService } from 'src/app/shared/services/weather/get-weather.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [MessageService]
})
export class DetailsComponent implements OnInit {
  @ViewChild('input', {static:true}) input: ElementRef;
  cities : cityType[] = [];
  city : string ;
  choosenCity: any ;
  cityInfo: any;
  constructor(private getCities:GetCitiesService, private getWeatherService: GetWeatherService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCities.getAll().pipe(
      map((cities)=>{
        this.cities = cities;
      })
    ).subscribe()

    fromEvent(this.input.nativeElement,'keyup').pipe(
      debounceTime(700),
      distinctUntilChanged(),
      tap(()=>{
        this.getCity();
      })
    ).subscribe();
  }
  cityClick(event){
    this.city=event.target.innerText;
    this.getCity();
  }

  getCity(){
    this.getWeatherService.get(this.city).pipe(
      catchError((error)=>{
        this.messageService.add({severity:'error', summary:'Error', detail:"Can't find city"});
        return of([]);
      }),
      tap((value)=>{
        if(value.length !==0){
          let date = new Date();
          let miliseconds = date.getTime();
          this.choosenCity=value;
          for(let i =0; i<this.choosenCity['list'].length; i++){
            let otherDate = new Date(this.choosenCity['list'][i]['dt_txt']);
            if(otherDate.getTime()>miliseconds){
              this.cityInfo = this.choosenCity['list'][i-1];
              break;
            }
          }
          this.messageService.add({severity:'success', summary:`${this.city}`, detail:"Found"});
        }
      }),
    ).subscribe((response)=>{})
  }
}
