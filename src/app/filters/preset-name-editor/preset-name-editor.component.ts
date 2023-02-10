import { MatSnackBar } from '@angular/material/snack-bar';
import { AudrosService } from './../../services/audros.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preset-name-editor',
  templateUrl: './preset-name-editor.component.html',
  styleUrls: ['./preset-name-editor.component.scss']
})
export class PresetNameEditorComponent implements OnInit {

  preset: any;
  name: string = '';
  id: string = '';

  constructor(
    public dialogRef: MatDialogRef<PresetNameEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _audrosService: AudrosService,
    private _matSnackBar: MatSnackBar
  ) {
    if (data.preset) {
      this.preset = data.preset;
    }

    if (data.name) {
      this.name = data.name;
    }

    if (data.id) {
      this.id = data.id;
    }
  }

  ngOnInit() {
  }

  save() {
    if (this.name === '') {
      this._matSnackBar.open('Please enter a name for this preset', 'Close', { duration: 3000 });
    } else {
      this._audrosService.savePreset(this.id, this.name, this.preset).subscribe(() => {
        this._matSnackBar.open('Preset saved successfully', 'Close', {duration: 3000});
      });
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
