import { SessionExpiredComponent } from './sessionExpired/sessionExpired.component';
import { MatDialog } from '@angular/material/dialog';
import { AudrosService } from './services/audros.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Portail FIM';
  private _timeoutAudros: any;

  constructor(
    private _audrosService: AudrosService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this._audrosService.errorConnection.subscribe((error: string) => {
      if (error !== '') {

        this._dialog.open(SessionExpiredComponent, {data: {errorMsg: error}});

      }
    });

    this.startTimeout();
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    await this._audrosService.logout().subscribe();
  }


  @HostListener('window:click')
  startTimeout(): void {

    if (this._timeoutAudros) {
      clearTimeout(this._timeoutAudros);
    }

    this._timeoutAudros = setTimeout(() => {

      this._audrosService.logout().subscribe();

      let dialogRef = this._dialog.open(SessionExpiredComponent, {data: {errorMsg: 'Your session has expired, please reconnect'}});

      dialogRef.afterClosed().subscribe(() => {
        window.location.reload();
      });

    }, 15*60*1000); // 15 minutes (15 x 60sec x 1000ms)

  }
}
