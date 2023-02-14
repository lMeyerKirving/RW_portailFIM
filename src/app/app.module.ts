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
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
    ScrollingModule,
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
    MatMenuModule,

    FontAwesomeModule,
    NgxImageZoomModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AudrosInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
