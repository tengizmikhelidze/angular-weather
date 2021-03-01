import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GetWeatherService } from 'src/app/shared/services/weather/get-weather.service';

@Component({
  selector: 'app-feature-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('image') image: ElementRef;
  @ViewChild('background') background: ElementRef;
  cityInfo = {name: 'Default'};
  weatherInfo = {main: {temp: 0},weather: [{main: 'default'}]};
  date : Array<string>= ['undefined'];
  iconId : string;
  sunset : number = 20;
  constructor(private getWeatherService: GetWeatherService) {
  }

  ngAfterViewInit(): void {
    this.getWeatherService.citySubject.pipe(
      tap(()=>{
        if(!this.iconId) this.iconId="01d";
        this.image.nativeElement.src = `assets/images/icons/weather/${this.iconId}.png`;
      }),
      tap(()=>{
        let date = new Date();
        let hour = date.getHours();
        switch(this.weatherInfo['weather'][0]['main']){
          case 'Rain':
          case 'Drizzle':
          case 'Thunderstorm':
            if(this.sunset >= hour){
              this.background.nativeElement.style.backgroundImage=`linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), url('assets/images/weather/rain.jpg')`;
              break;
            } else {
              this.background.nativeElement.style.backgroundImage=`linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), url('assets/images/weather/night_rain.jfif')`;
              break;
            }
          case 'Clouds':
            if(this.sunset >= hour){
              this.background.nativeElement.style.backgroundImage=`linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), url('assets/images/weather/clouds.png')`;
              break;
            } else {
              this.background.nativeElement.style.backgroundImage=`linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), url('assets/images/weather/night_clouds.jpg')`;
              break;
            }
          case 'Clear':
            if(this.sunset >= hour){
              this.background.nativeElement.style.backgroundImage=`linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), url('assets/images/weather/sunny.jfif')`;
              break;
            } else {
              this.background.nativeElement.style.backgroundImage=`linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), url('assets/images/weather/night_clear.jpg')`;
              break;
            }
          case 'Snow':
            if(this.sunset >= hour){
              this.background.nativeElement.style.backgroundImage=`linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), url('assets/images/weather/snow.jpg')`;
              break;
            } else {
              this.background.nativeElement.style.backgroundImage=`linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%), url('assets/images/weather/night_snow.jpg')`;
              break;
            }
        }
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.getWeatherService.citySubject.pipe(
      tap((info)=>{
        if(info.length !== 0){
          this.cityInfo = info['city'];
          let date = new Date(this.cityInfo['sunset']);
          this.sunset = date.getHours();
          return info;
        }
      }),
      tap((value)=>{
        if(value.length !==0){
          let date = new Date();
          let miliseconds = date.getTime();
          let choosenCity=value;
          for(let i =0; i<choosenCity['list'].length; i++){
            let otherDate = new Date(choosenCity['list'][i]['dt_txt']);
            if(otherDate.getTime()>miliseconds){
              this.weatherInfo = choosenCity['list'][i-1];
              this.date = this.weatherInfo['dt_txt'].split(' ');
              this.iconId = choosenCity['list'][i-1]['weather'][0]['icon'];
              break;
            }
          }
        }
      }),
    ).subscribe();
  }

}
