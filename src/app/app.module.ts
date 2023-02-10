import { PresetNameEditorComponent } from './filters/preset-name-editor/preset-name-editor.component';
import { AudrosInterceptor } from './audros.interceptor';
import { SessionExpiredComponent } from './sessionExpired/sessionExpired.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { FiltersComponent } from './filters/filters.component';
import { ObjetCardComponent } from './objet-card/objet-card.component';
import { ObjetDetailsComponent } from './objet-details/objet-details.component';
import { ObjetDetailsGalleryComponent } from './objet-details-gallery/objet-details-gallery.component';
import { ObjetDetailsFilesComponent } from './objet-details-files/objet-details-files.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    FiltersComponent,
    ObjetCardComponent,
    ObjetDetailsComponent,
    ObjetDetailsGalleryComponent,
    ObjetDetailsFilesComponent,
    LayoutComponent,
    SessionExpiredComponent,
    PresetNameEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,

    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AudrosInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
