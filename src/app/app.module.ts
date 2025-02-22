import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendamientoComponent } from './agendamiento/agendamiento.component';
import { HttpClientModule } from '@angular/common/http';
import { AgendamientoModalComponent } from './agendamiento-modal/agendamiento-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendamientoComponent,
    AgendamientoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
