import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getAppConfigProvider } from '@aymme/client/shared/app-config';
import { ClientShellFeatureModule } from '@aymme/client/shell/feature';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClientShellFeatureModule
  ],
  providers: [getAppConfigProvider(environment)],
  bootstrap: [AppComponent],
})
export class AppModule {}
