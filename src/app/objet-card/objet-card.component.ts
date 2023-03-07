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
    console.log('init card selected');
  }

  openDetails(): void {
    this.dialog.open(ObjetDetailsComponent, {
      data: {object: this.object},
    });
  }

  getObjectPicture(): string {
    if (this.object.pictures !== undefined && this.object.pictures.length > 0 && this.object.pictures[0].url !== undefined) {
      return this.object.pictures[0].url;
    }

    return "https://picsum.photos/300/450";
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
