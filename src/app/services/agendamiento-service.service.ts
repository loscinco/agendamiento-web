import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamientoServiceService {

  private apiUrl = 'https://rcapruebas.unad.edu.co:8002/agendamiento-api/api/bookings';  // URL de tu backend

  constructor(private http: HttpClient) { }

  // Método para crear una cita
  crearCita(cita: any): Observable<any> {
    return this.http.post(this.apiUrl, cita);
  }
}
