import { map, BehaviorSubject, Observable, firstValueFrom, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AudrosService {

  public audrosServer: string = 'https://dms-server/';
  public ServiceParameters: string = '';
  public authInfos = '&AUSessionID=';
  public Ct = '25';
  public UL = 'ecranConsult';
  public mode = '';
  public searchedReference = '';
  public errorConnection: BehaviorSubject<string> = new BehaviorSubject('');
  public connected = false;

  public filters: BehaviorSubject<[]> = new BehaviorSubject([]);
  public objects: BehaviorSubject<[]> = new BehaviorSubject([]);
  public favorites: BehaviorSubject<[]> = new BehaviorSubject([]);
  public presets: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  private _sessionId = '';
  private _baseUrl: string = '';

  constructor(
    private _httpClient: HttpClient,
    private _snackbar: MatSnackBar,
  ) {
    let url = document.location.protocol + '//' + document.location.hostname + ':' + document.location.port + '/';
    this.audrosServer = url;
  }

  public async connectAudros(username: string, password: string): Promise<any> {
    this.UL = username;
    const url = `${this.audrosServer}cocoon/View/LoginCAD.xml?userName=${username}&computerName=AWS&userPassword=${password}&dsn=dmsDS&Client_Type=${this.Ct}`;

    this._sessionId = await firstValueFrom(this._httpClient.get(url, { responseType: 'text' }).pipe(map((res) => {

      const regex = /<result>(.*)<\/result>/gm;
      let m = regex.exec(res);

      if (m !== undefined && m !== null && m.length >= 2) {
        this.connected = true;
        return m[1];
      }

      this.errorConnection.next('Unable to connect to server.');

      return '';

    })));

    this._baseUrl = 'cocoon/View/ExecuteService/fr/AW_AuplResult3.text?'+this.authInfos+this._sessionId+'&ServiceSubPackage=raymondweil/portailRW&ServiceName=portailRW.au&ServiceParameters=';

    return of(true);
  }

  public logout(): Observable<any> {
    return this._httpClient.get(`https://dms-server/cocoon/View/LogoutXML.xml?UserName=${this.UL}&dsn=dmsDS&Client_Type=${this.Ct}`, { responseType: 'text' });
  }

  public getFilters(): Observable<any> {
    const url = `${this.audrosServer}${this._baseUrl}filters`;

    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        if (data !== null) {
          this.filters.next(data.data);
        }
      })
    );
  }

  public getPresets(): Observable<any> {
    const url = `${this.audrosServer}${this._baseUrl}presets`;
    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        if (data !== null && data.data !== undefined) {
          let presetsArray = [];

          for (const dataPreset of data.data) {
            if (this._isJsonString(dataPreset.value)) {
              presetsArray.push({
                'id': dataPreset.id,
                'name': dataPreset.name,
                'value': JSON.parse(dataPreset.value)
              });
            }
          }

          this.presets.next(presetsArray);
        }
      })
    );
  }

  public getObjects(): Observable<any> {
    const url = `${this.audrosServer}${this._baseUrl}objects`;
    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        if (data !== null) {
          this.objects.next(data.data);
        }
      })
    );
  }

  public getFavorites(): Observable<any> {
    const url = `${this.audrosServer}${this._baseUrl}favorites`;
    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        if (data !== null) {
          this.favorites.next(data.data);
        }
      })
    );
  }

  public removeFavorite(id: string): Observable<any> {
    const url = `${this.audrosServer}${this._baseUrl}removeFavorite@${id}`;
    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        if (data !== null) {
          this.getFavorites().subscribe();
        }
      })
    );
  }

  public addFavorite(id: string): Observable<any> {
    const url = `${this.audrosServer}${this._baseUrl}addFavorite@${id}`;
    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        if (data !== null) {
          this.getFavorites().subscribe();
        }
      })
    );
  }

  public savePreset(id: string, name: string, preset: any): Observable<any> {
    let arrayPreset: any[] = [];
    for (const [key, value] of Object.entries(preset)) {
      arrayPreset.push(key+'='+value);
    };

    const argumentsPreset = arrayPreset.join(';');

    let url = `${this.audrosServer}${this._baseUrl}savePreset@${id}@${name}@${argumentsPreset}`;
    if (id === undefined || id === null || id === '') {
      url = `${this.audrosServer}${this._baseUrl}newPreset@${name}@${argumentsPreset}`;
    }

    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        if (data!== null) {
          this.getPresets().subscribe();
        }
      })
    );
  }

  public removePreset(id: string): Observable<any> {
    const url = `${this.audrosServer}${this._baseUrl}removePreset@${id}`;

    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        if (data!== null) {
          this.getPresets().subscribe();
        }
      })
    );
  }

  public exportPdf(id: string): Observable<any> {
    const url = `${this.audrosServer}${this._baseUrl}exportPdf@${id}`;

    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        return data;
      })
    );
  }

  public getObjectActions(id: string): Observable<any> {
    const url = `${this.audrosServer}${this._baseUrl}getObjectActions@${id}`;
    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        return data;
      })
    );
  }

  public execActionWs(wsName:string, params: string): Observable<any> {
    const url = `${this.audrosServer}${this._baseUrl}${wsName}@${params}`;
    return this._httpClient.get(url).pipe(
      map((data: any) => {
        const hasError  = this.handleError(data);
        if (hasError) {
          return;
        }

        return data;
      })
    );
  }

  public handleError(response: any): boolean {

    if (response && response.error) {

      this._snackbar.open(response.error, '', {
        duration: 5000,
        panelClass: ['mat-toolbar','mat-warn']
      });

      return true;

    }

    if (response && response.warning) {

      this._snackbar.open(response.error, '', {
        duration: 5000,
        panelClass: ['mat-toolbar','mat-info']
      });

      return true;

    }

    return false;

  }

  private _isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
}
