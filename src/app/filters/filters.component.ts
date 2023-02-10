import { PresetNameEditorComponent } from './preset-name-editor/preset-name-editor.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AudrosService } from './../services/audros.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() filterSelection: EventEmitter<any> = new EventEmitter();

  filters: any[] = [];
  presets: any[] = [];

  view = 'filters';

  public toSearch = {
    favoritesOnly: false
  };

  constructor(
    private _audrosService: AudrosService,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._audrosService.filters.subscribe(filters => {
      this.filters = filters;
    });

    this._audrosService.presets.subscribe(presets => {
      this.presets = presets;
    });
  }

  loadPreset(preset: any): void {
    this.view = 'filters';
    this.toSearch = {
      favoritesOnly: false
    };

    for (const fieldName in preset.value) {
      const value = preset.value[fieldName];
      (this.toSearch as any)[fieldName] = value;
    }

    this.doFilter();
  }

  savePreset(): void {
    if (Object.keys(this.toSearch).length === 1) {
      this._snackbar.open('Please make sure you set at least one filter field', 'Close', {duration: 3000});
    } else {
      this._dialog.open(PresetNameEditorComponent, {data: {preset: this.toSearch}});
    }
  }

  editPreset(preset: any): void {
    this._dialog.open(PresetNameEditorComponent, {data: {name: preset.name, id: preset.id, preset: preset.value}});
  };

  removePreset(preset: any): void {
    this._audrosService.removePreset(preset.id).subscribe();
  }

  getValueToSearch(fieldName: string): any {
    return (Object.keys(this.toSearch).includes(fieldName) ? (this.toSearch as any)[fieldName] : '') ;
  }

  fieldChanged(fieldName: string, event: any): void {
    let value = '';
    if (event.target) {
      value = event.target.value;
    }

    if (event.value) {
      value = event.value;
    }

    if (value !== null && value !== undefined && value !== '') {
      (this.toSearch as any)[fieldName] = value;
    } else if (Object.keys(this.toSearch).includes(fieldName)) {
      delete (this.toSearch as any)[fieldName];
    }
  }

  doFilter(): void {
    this.filterSelection.emit(this.toSearch);
  }

  reset(): void {
    this.toSearch = {
      favoritesOnly: false
    };
    this.doFilter();
  }

}
