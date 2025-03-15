import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearEstablecimientoComponent } from './establecimiento/crear-establecimiento/crear-establecimiento.component';
import { AgendamientoComponent } from './agendamiento/agendamiento.component';
import { EspecialistaComponent } from './especialista/especialista.component';
import { ListaEspecialistasComponent } from './especialista/lista-especialistas/lista-especialistas.component';
import { AgendaEspecialistaComponent } from './especialista/agenda-especialista/agenda-especialista.component';

const routes: Routes = [
  { path: 'crear-establecimiento', component: CrearEstablecimientoComponent },
  { path: 'agendamiento', component: AgendamientoComponent },
  { path: 'especialista', component: EspecialistaComponent },
  { path: 'lista-especialistas', component: ListaEspecialistasComponent },
  { path: 'agenda-especialista/:id/:name', component: AgendaEspecialistaComponent },
  { path: '', redirectTo: '/agendamiento', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
