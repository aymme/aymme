import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getAppConfigProvider } from '@aymme/client/shared/app-config';
import { ClientShellFeatureModule } from '@aymme/client/shell/feature';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

const toastrOptions = {
  timeOut: 5000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  closeButton: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ClientShellFeatureModule,
    ToastrModule.forRoot(toastrOptions),
    FontAwesomeModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
  ],
  providers: [getAppConfigProvider({ production: environment.production, apiUrl: environment.apiUrl })],
  bootstrap: [AppComponent],
})
export class AppModule {}
