import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamientoServiceService {

  private apiUrl = 'https://rcapruebas.unad.edu.co:8002/agendamiento-api/api/';  // URL de tu backend

  constructor(private http: HttpClient) { }

  // Método para crear una cita
  crearCita(cita: any): Observable<any> {
    return this.http.post(this.apiUrl+"bookings", cita);
  }
  getAgendaEspecialista(especialistaId: string): Observable<any> {
    return this.http.get(this.apiUrl+"getschedulebyspecialist/"+especialistaId);
  }

  reeplazarCita(cita: any): Observable<any> {
    return this.http.post(this.apiUrl+"reschedule", cita);
  }
}
