import { AudrosService } from './../services/audros.service';
import { ObjetDetailsComponent } from './../objet-details/objet-details.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-objet-card',
  templateUrl: './objet-card.component.html',
  styleUrls: ['./objet-card.component.scss']
})
export class ObjetCardComponent implements OnInit {

  @Input() object: any = undefined;
  @Input() isFavorite: boolean = false;

  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private _audrosService: AudrosService
  ) { }

  ngOnInit(): void {
  }

  openDetails(): void {
    const dialogRef = this.dialog.open(ObjetDetailsComponent, {
      data: {object: this.object},
    });
  }

  addFavorite(): void {
    this._audrosService.addFavorite(this.object.id).subscribe();
  }

  removeFavorite(): void {
    this._audrosService.removeFavorite(this.object.id).subscribe();
  }

  onSelectionChanged(event: any): void {
    this.selectionChanged.emit({event: event, object: this.object});
  }

}
