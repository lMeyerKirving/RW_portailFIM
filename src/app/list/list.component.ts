import { MatSnackBar } from '@angular/material/snack-bar';
import { AudrosService } from './../services/audros.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  allObjects: any[] = [];
  objects: any[] = [];
  favorites: any[] = [];
  filterSelection = {};
  selection: any[] = [];
  itemSet: any[] = [];

  constructor(
    private _audrosService: AudrosService,
    private _matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._audrosService.objects.subscribe((objects) => {
      this.objects = objects;
      this.allObjects = objects;

      for (let index = 0; index < 1000; index++) {
        this.objects = this.objects.concat(objects);
        this.allObjects = this.allObjects.concat(objects);
      }

      this.filterObjects(this.filterSelection);
    });

    this._audrosService.favorites.subscribe((favorites) => {
      this.favorites = favorites;

      this.filterObjects(this.filterSelection);
    });
  }

  filterObjects(filterSelection: any): void {
    let filtered: any[] = [];
    this.filterSelection = filterSelection;

    let filters = 0;
    for (const filterParam in filterSelection) {
      if (filterParam === 'favoritesOnly') {
        continue;
      };

      const filterValue = filterSelection[filterParam];

      const inSearch = this.allObjects.filter((object: any) => (
        object[filterParam] !== undefined && object[filterParam].includes(filterValue)
      ));

      if (filtered.length === 0) {
        filtered = inSearch;
      } else {
        filtered = filtered.filter(object => inSearch.map(objectInSearch => objectInSearch.id).includes(object.id));
      }
      filters++;
    }

    if (filters === 0) {
      this.objects = this.allObjects;
    } else {
      this.objects = filtered;
    }

    if (filterSelection.favoritesOnly) {
      this.objects = this.objects.filter(object => this.isInFavorites(object));
    }

    this.itemSet = this._generateDataChunk(this.objects);
  }

  isInFavorites(object: any): boolean {
    return this.favorites.includes(object.id);
  }

  selectionChanged(selection: any): void {
    this.selection = this.selection.filter(selectedObject => selectedObject.id !== selection.object.id);
    if (selection.event.checked) {
      this.selection.push(selection.object);
    }
  }

  exportPdf(): void {

    if (!this.selection || !this.selection.length) {
      this._matSnackBar.open('Please select at least one object to export', 'Close', { duration: 3000 });
      return;
    }

    this._audrosService.exportPdf(this.selection.map(selectedObject => selectedObject.id).join(',')).subscribe((response: any) => {
      console.log(response);
      if (response.data && response.data.url) {
        window.open(response.data.url);
      }
    });
  }

  exportCsv(): void {
    let rows = this.selection;

    if (!rows || !rows.length) {
      this._matSnackBar.open('Please select at least one object to export', 'Close', { duration: 3000 });
      return;
    }
    const separator = ';';
    let keys = Object.keys(rows[0]);
    keys = keys.filter(key => key !== 'pictures' && key !== 'icons');
    const csvData =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'export_fim.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  _generateDataChunk(data: any, chunk = 4) {
    let index: number;
    let dataChunk: [][] = [];
    for (index = 0; index < data.length; index += chunk) {
      dataChunk.push(data.slice(index, index + chunk));
    }
    return dataChunk;
  }

}
