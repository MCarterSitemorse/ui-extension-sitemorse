import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material.module';
import { PriorityComponent } from './priority/priority.component';
import { SitemorseService } from '../shared/sitemorse.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    PriorityComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
