import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  private apiUrl = 'https://rcapruebas.unad.edu.co:8002/specialist/specialists';
  constructor(private http: HttpClient) { }
  crearEspecialista(especialista: any): Observable<any> {
        return this.http.post(this.apiUrl, especialista);
  }

  getEspecialistas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/active/4');
  }

  getEspecialistasByIdandService(establecimientoId: number, serviceId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/specialistbyid/'+serviceId+'/'+establecimientoId);
  }

  getDisponibilidad(specialistID: string, duration: String, date: string): Observable<any> {
    return this.http.get(this.apiUrl+"/specialistAvailability/"+specialistID+"/"+duration+"/"+date);
  }
}
