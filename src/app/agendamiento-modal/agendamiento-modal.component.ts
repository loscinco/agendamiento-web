import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AgendamientoServiceService } from '../services/agendamiento-service.service';

declare var $: any;

@Component({
  selector: 'app-agendamiento-modal',
  templateUrl: './agendamiento-modal.component.html',
  styleUrls: ['./agendamiento-modal.component.css']
})
export class AgendamientoModalComponent implements OnInit, AfterViewInit {
  response: any;
  citaAnterior: any;
  citaActual: any;

  constructor(private AgendamientoService : AgendamientoServiceService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#citaModal').modal({
      show: false
    });
    $('#citaModal2').modal({
      show: false
    });
  }

  openModal(message: any, cita: boolean, citaAnterior?: any, citaActual?: any) {
    this.response = message;
    this.citaAnterior = citaAnterior;
    this.citaActual = citaActual;
    if (cita) {
      $('#citaModal').modal('hide');
      $('#citaModal2').modal('show'); // Mostrar modal para cita existente
    } else {
      $('#citaModal2').modal('hide');
      $('#citaModal').modal('show'); // Mostrar modal para nueva cita
    }
  }

  closeModal() {
    $('#citaModal').modal('hide');
    $('#citaModal2').modal('hide');
  }

  replazarCita() { // Reemplazar cita existente
    this.AgendamientoService.reeplazarCita(this.citaActual).subscribe(
      response => {
        //console.log('Cita reemplazada:', response);
        this.openModal("La cita fue remplazada exitosamente", false);
      }
    );
    this.closeModal();
  }
}