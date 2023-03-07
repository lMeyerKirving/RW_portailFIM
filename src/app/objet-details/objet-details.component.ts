import { SessionExpiredComponent } from './../sessionExpired/sessionExpired.component';
import { HttpClient } from '@angular/common/http';
import { AudrosService } from './../services/audros.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-objet-details',
  templateUrl: './objet-details.component.html',
  styleUrls: ['./objet-details.component.scss']
})
export class ObjetDetailsComponent implements OnInit {

  object: any;
  bigImageUrl: string = '';
  bigImageUrlOriginal: string = '';
  actions: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ObjetDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _audrosService: AudrosService,
    private _http: HttpClient,
    private _dialog: MatDialog
  ) {
    this.object = data.object;
    if (this.object.pictures && this.object.pictures.length > 0) {
      this.changeBigImage(this.object.pictures[0]);
    }
  }

  ngOnInit(): void {
    this.actions = [];

    this._audrosService.getObjectActions(this.object.id).subscribe((response: any) => {
      if (response && response.data && response.data.length > 0) {
        this.actions = response.data;
      }
    });
  }

  changeBigImage(image: any) {
    this.bigImageUrl = image.url;
    this.bigImageUrlOriginal = image.original ? image.original : image.url;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  exportPdf(): void {
    this._audrosService.exportPdf(this.object.id).subscribe((response: any) => {
      if (response.data && response.data.url) {
        window.open(response.data.url);
      }
    });
  }

  execAction(action: any): void {
    if (action.ws !== undefined && action.ws !== null && action.url !== '') {
      let params = [];
      for (const param of action.parameters) {
        if (this.object[param] !== undefined) {
          params.push(this.object[param]);
        }
      }

      this._audrosService.execActionWs(action.ws, params.join('@')).subscribe((response: any) => {
        if (response.data) {
          this.execCallbackAction(action, response.data);
        }
      });
    }

    this.execCallbackAction(action);
  }

  execCallbackAction(action: any, param: any = ''): void {
    console.log('Executing callback');
    console.log(action, param);

    for (const callbackAction of action.callback) {
      switch (callbackAction) {
        case 'openUrl':
          window.open(param.url);
          break;
        case 'closeDialog':
          this.closeDialog();
          break;
        case 'refreshObjects':
          this._audrosService.getObjects().subscribe();
          break;
        case 'download':
          this.download(param.url);
          break;

        default:
          break;
      }
    }
  }

  download(url: string): void {
    if (url === undefined || url === '') {
      return;
    }

    const filename = this.getFilename(url);

    this._http.get(url, {
      responseType: 'blob'
    }).subscribe({
      next: blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = filename;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: () => {
        this._dialog.open(SessionExpiredComponent, {data: {errorMsg: 'Unable to download file at url: ' + url}});
      }
    });
  }

  getFilename(url: string): string {
    return url.substring(url.lastIndexOf('/')+1);
  }

}
