import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './common/components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from './shared/material/material.module';

import { LOCALE_ID } from '@angular/core'
import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
