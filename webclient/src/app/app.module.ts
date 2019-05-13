import { BrowserModule } from '@angular/platform-browser';
import {NgModule, TemplateRef} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NetworthComponent } from './networth/networth.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { TogglerComponent } from './toggler/toggler.component';

@NgModule({
  declarations: [
    AppComponent,
    NetworthComponent,
    LoginComponent,
    TogglerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
