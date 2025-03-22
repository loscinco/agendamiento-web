import { Component, OnInit } from '@angular/core';
import { EspecialistaService } from '../../services/especialista/especialista.service';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.css']
})
export class ListaEspecialistasComponent implements OnInit {
  especialistas: any[] = [];

  constructor(private especialistaService: EspecialistaService) {}

  ngOnInit(): void {
    this.especialistaService.getEspecialistas().subscribe(
      data => {
        this.especialistas = data;
      },
      error => {
        console.error('Error al obtener especialistas:', error);
      }
    );
    /*this.especialistas = [
      {
        identification: 1012345678,
        firstName: 'Jose',
        lastName: 'Pérez',
        especialidad: 'Cardiología',
        email: 'hagredo@javeriana.edu.co',
        phone: '123456789'
      },
      {
        identification: 1012345679,
        firstName: 'Juan',
        lastName: 'Gómez',
        especialidad: 'Pediatría',
        email: 'asdasd@gmail.com',
        phone: '123456789'
      }
    ];*/
  }
}