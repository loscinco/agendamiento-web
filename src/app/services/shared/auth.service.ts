import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(false); // Estado inicial
  isAdmin$ = this.isAdminSubject.asObservable(); // Observable para suscribirse

  constructor() {
    // Inicializar el estado desde localStorage
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    this.isAdminSubject.next(isAdmin);
  }

  setIsAdmin(value: boolean): void {
    this.isAdminSubject.next(value); // Actualizar el estado
    localStorage.setItem('isAdmin', value.toString()); // Guardar en localStorage
  }
}