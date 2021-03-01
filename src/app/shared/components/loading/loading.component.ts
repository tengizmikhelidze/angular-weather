import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-shared-component-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public showLoader : boolean = false;
  constructor(private loadingService : LoadingService) { }

  ngOnInit(): void {
    this.loadingService.showLoader.pipe(
      tap((value)=>{
        this.showLoader = value;
      })
    ).subscribe()
  }

}
