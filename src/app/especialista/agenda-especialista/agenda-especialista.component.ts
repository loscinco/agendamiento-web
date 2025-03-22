import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspecialistaService } from '../../services/especialista/especialista.service';
import { AgendamientoServiceService } from 'src/app/services/agendamiento-service.service';

@Component({
  selector: 'app-agenda-especialista',
  templateUrl: './agenda-especialista.component.html',
  styleUrls: ['./agenda-especialista.component.css']
})
export class AgendaEspecialistaComponent implements OnInit {
  agenda: any[] = [];
  especialistaId: string;
  especialistaName: string;

  constructor(
    private route: ActivatedRoute,
    private especialistaService: EspecialistaService,
    private agendamientoService: AgendamientoServiceService
  ) {}

  ngOnInit(): void {
    this.especialistaId = this.route.snapshot.paramMap.get('id');
    this.especialistaName = this.route.snapshot.paramMap.get('name');
    this.agendamientoService.getAgendaEspecialista(this.especialistaId).subscribe(
      data => {
        //console.log('Agenda del especialista:', data);
        this.agenda = data;
      },
      error => {
        console.error('Error al obtener la agenda del especialista:', error);
      }
    );
    /*this.agenda = [
      {
        fecha: '2025-03-11',
        hora: '08:00',
        diaSemana: 'Lunes',
        nombrePaciente: 'Andres Lopez'
      },
      {
        fecha: '2025-03-11',
        hora: '09:00',
        diaSemana: 'Lunes',
        nombrePaciente: 'Carlos Perez'
      },
      {
        fecha: '2025-03-11',
        hora: '10:00',
        diaSemana: 'Lunes',
        nombrePaciente: 'Maria Rodriguez'
      },
      {
        fecha: '2025-03-11',
        hora: '11:00',
        diaSemana: 'Lunes',
        nombrePaciente: 'Laura Gomez'
      }
    ];*/
  }

  volver(): void {
    window.history.back();
  }
}