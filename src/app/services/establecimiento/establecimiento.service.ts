import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {

  private apiUrl = 'https://rcapruebas.unad.edu.co:8002/establishments/establishments/save';
  constructor(private http: HttpClient) { }

  // Método para crear un establecimiento
  crearEstablecimiento(cita: any): Observable<any> {
    return this.http.post(this.apiUrl, cita);
  }
  
  getServicios(): Observable<any> {
    return this.http.get('https://rcapruebas.unad.edu.co:8002/establishments/businessservices/getservices/');
  }
}
