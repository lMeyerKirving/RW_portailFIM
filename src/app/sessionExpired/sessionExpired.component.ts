import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sessionExpired',
  templateUrl: './sessionExpired.component.html',
  styleUrls: ['./sessionExpired.component.scss']
})
export class SessionExpiredComponent implements OnInit {

  public errorMsg: string = '';

  constructor(
    private _dialogRef: MatDialogRef<SessionExpiredComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: { errorMsg: string },
  ) {
    if (this._data.errorMsg !== '') {
      this.errorMsg = this._data.errorMsg;
    }
  }

  ngOnInit() {
  }

  close(): void {
    this._dialogRef.close();
  }

}
