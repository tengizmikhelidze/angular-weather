import { Component, ElementRef, OnInit, Output, ViewChild,EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { cityType } from 'src/app/shared/interfaces/cityType';
import { GetCitiesService } from 'src/app/shared/services/cities/get-cities.service';
import { GetWeatherService } from 'src/app/shared/services/weather/get-weather.service';

@Component({
  selector: 'app-feature-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [MessageService]
})
export class DetailsComponent implements OnInit {
  @Output() cityChanded = new EventEmitter();
  @ViewChild('input') input: ElementRef;
  cities: cityType[] = [];
  city: string;
  choosenCity: any;
  cityInfo: any;
  constructor(
    private getCities: GetCitiesService,
    private getWeatherService: GetWeatherService,
    private messageService: MessageService,
    private changeDetectorRef : ChangeDetectorRef
    ) {
    // if(navigator.geolocation){
      //   navigator.geolocation.getCurrentPosition((position)=>{
        //     this.getCity(position.coords.latitude, position.coords.longitude)
    //   });
    //   navigator.permissions.query({name:'geolocation'}).then((result) => {
      //     if(result.state === 'denied'){
        //       this.messageService.add({ severity: 'error', summary: "Location servise isn't Allowed", detail: "Allow Location and refresh page" });
        //       this.city = "Tbilisi"
        //       this.getCity();
    //     }
    //     if(result.state === 'prompt'){
    //       this.messageService.add({ severity: 'error', summary: "Location servise isn't Allowed", detail: "Allow Location and refresh page" });
    //       this.city = "Tbilisi"
    //       this.getCity();
    //     }
    //   })
    // } else {
      //   this.messageService.add({ severity: 'error', summary: 'Error', detail: "Location servise isn't supported your browser" });
      //   this.city="tbilisi";
      //   this.getCity();
      // }
    if(localStorage.getItem('city')){
      this.city = localStorage.getItem('city');
    }else{
      this.city = 'Tbilisi'
    }
    this.cities = this.getCities.getAll();
    this.getCity();
  }

  ngOnInit(): void {}

  cityClick(event) {
    this.city = event.target.innerText;
    this.cityChanded.emit('true');
    this.getCity();
  }
  getCity(latitude?: number, longitude?: number) {
    this.cityChanded.emit('true');
    localStorage.setItem('city', this.city)
    if(!longitude && !latitude){
      this.getWeatherService.get(this.city).pipe(
        catchError((error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Can't find city" });
          return of([]);
        }),
        tap((value) => {
          if (value.length !== 0) {
            let date = new Date();
            let miliseconds = date.getTime();
            this.choosenCity = value;
            for (let i in this.choosenCity['list']) {
              let otherDate = new Date(this.choosenCity['list'][i]['dt_txt']);
              if (otherDate.getTime() > miliseconds) {
                this.cityInfo = this.choosenCity['list'][Number(i) - 1];
                break;
              }
            }
            this.messageService.add({ severity: 'success', summary: `${this.city}`, detail: "Found" });
          }
        }),
        tap(()=>this.changeDetectorRef.detectChanges())
      ).subscribe()
    } else {
      this.getWeatherService.getByChords(latitude,longitude).pipe(
        catchError((error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Can't find city" });
          return of([]);
        }),
        tap((value) => {
          if (value.length !== 0) {
            let date = new Date();
            let miliseconds = date.getTime();
            this.choosenCity = value;
            for (let i in this.choosenCity['list']) {
              let otherDate = new Date(this.choosenCity['list'][i]['dt_txt']);
              if (otherDate.getTime() > miliseconds) {
                this.cityInfo = this.choosenCity['list'][Number(i) - 1];
                break;
              }
            }
            this.messageService.add({ severity: 'success', summary: `${value['city']['name']}`, detail: "Found" });
          }
        }),
      ).subscribe()
    }
  }
}
