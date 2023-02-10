import { MatSnackBar } from '@angular/material/snack-bar';
import { AudrosService } from './../services/audros.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = '';

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private _router: Router,
    private _audrosService: AudrosService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this._audrosService.connectAudros(this.form.get('username')?.getRawValue(), this.form.get('password')?.getRawValue()).then(() => {
        this._router.navigate(['/list']);
        this.form.reset();
        this._snackbar.open('Connected!', 'Close', { duration: 3000 });
      });
    }
  }

}
