import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearEstablecimientoComponent } from './establecimiento/crear-establecimiento/crear-establecimiento.component';
import { AgendamientoComponent } from './agendamiento/agendamiento.component';

const routes: Routes = [
  { path: 'crear-establecimiento', component: CrearEstablecimientoComponent },
  { path: 'agendamiento', component: AgendamientoComponent },
  { path: '', redirectTo: '/agendamiento', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
