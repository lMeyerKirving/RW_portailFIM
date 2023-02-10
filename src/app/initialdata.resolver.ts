import { AudrosService } from './services/audros.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitialdataResolver implements Resolve<boolean> {

  constructor(private _audrosService: AudrosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([
      this._audrosService.getFilters(),
      this._audrosService.getPresets(),
      this._audrosService.getObjects(),
      this._audrosService.getFavorites(),
    ]);
  }
}
