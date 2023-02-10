import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-objet-details',
  templateUrl: './objet-details.component.html',
  styleUrls: ['./objet-details.component.scss']
})
export class ObjetDetailsComponent implements OnInit {

  object: any;
  bigImageUrl: string = '';

  constructor(
    public dialogRef: MatDialogRef<ObjetDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.object = data.object;
    this.bigImageUrl = this.object.pictures[0].url;
  }

  ngOnInit(): void {
  }

}
