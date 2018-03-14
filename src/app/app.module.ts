import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material.module';
import { SitemorseService } from '../shared/sitemorse.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { PriorityExpansionComponent } from './priority-expansion/priority-expansion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingDialogComponent,
    PriorityExpansionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [
      SitemorseService
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoadingDialogComponent]
})
export class AppModule { }
