import { AudrosService } from './../services/audros.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-objet-details',
  templateUrl: './objet-details.component.html',
  styleUrls: ['./objet-details.component.scss']
})
export class ObjetDetailsComponent implements OnInit {

  object: any;
  bigImageUrl: string = '';
  actions: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ObjetDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _audrosService: AudrosService
  ) {
    this.object = data.object;
    this.bigImageUrl = this.object.pictures[0].url;
  }

  ngOnInit(): void {
    this.actions = [];

    this._audrosService.getObjectActions(this.object.id).subscribe((response: any) => {
      if (response.data && response.data.length > 0) {
        this.actions = response.data;
      }
    });
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
    console.log('executing action', action);

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
    switch (action.callback) {
      case 'openUrl':
        window.open(param);
        break;
      case 'closeDialog':
        this.closeDialog();
        break;
      case 'refreshObjects':
        this._audrosService.getObjects().subscribe();
        break;

      default:
        break;
    }
  }

}
