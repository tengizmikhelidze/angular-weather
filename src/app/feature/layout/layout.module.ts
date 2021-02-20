import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { GetWeatherService } from 'src/app/shared/services/weather/get-weather.service';

const components = [LayoutComponent]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule
  ],
  exports: [...components],
  providers: [GetWeatherService]
})
export class LayoutModule { }
