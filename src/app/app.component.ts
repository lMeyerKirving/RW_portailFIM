import { SessionExpiredComponent } from './sessionExpired/sessionExpired.component';
import { MatDialog } from '@angular/material/dialog';
import { AudrosService } from './services/audros.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rw-front';

  constructor(
    private _audrosService: AudrosService,
    private _dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this._audrosService.errorConnection.subscribe((error: string) => {
      if (error !== '') {

        let dialogRef = this._dialog.open(SessionExpiredComponent, {data: {errorMsg: error}});

      }
    });
  }
}
