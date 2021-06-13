import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxTypeaheadModule } from "ngx-typeahead";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
//import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
declare const chance:any;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxTypeaheadModule,
    InfiniteScrollModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
