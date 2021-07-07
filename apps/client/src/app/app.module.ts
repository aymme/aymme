import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ClientShellFeatureModule } from '@aymme/client/shell/feature';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ClientShellFeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
