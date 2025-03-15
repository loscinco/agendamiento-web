import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendamientoServiceService } from '../services/agendamiento-service.service';
import { EspecialistaService } from '../services/especialista/especialista.service';
import { AgendamientoModalComponent } from '../agendamiento-modal/agendamiento-modal.component';
import { EstablecimientoService } from '../services/establecimiento/establecimiento.service';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.css']
})
export class AgendamientoComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: AgendamientoModalComponent;
  agendamientoForm: FormGroup;
  horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  today: string;
  especialistas: any[] = [];
  servicios: any[] = [];
  selectedService: any;
  isDateSelected: boolean = false;
  
  constructor(private fb: FormBuilder, 
    private AgendamientoService : AgendamientoServiceService, 
    private especialistaService: EspecialistaService,
    private establecimientoService: EstablecimientoService) {
    const todayDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
    this.today = todayDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
   }

  ngOnInit(): void {
    this.agendamientoForm = this.fb.group({
      nameClient: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      serviceID: ['', Validators.required],
      specialistID: ['', Validators.required],
      dateAppointment: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
    this.establecimientoService.getServicios().subscribe(
      response => {
        this.servicios = response.data;
        //console.log('Servicios:', response);
      }
    );
  }

  onSubmit(): void {
    if (this.agendamientoForm.valid) {
      
      const cita = {
        nameClient: this.agendamientoForm.value.nameClient,
        email: this.agendamientoForm.value.email,
        phone: this.agendamientoForm.value.phone,
        specialistID: this.agendamientoForm.value.specialistID,
        serviceID: this.agendamientoForm.value.serviceID,
        dateAppointment: this.agendamientoForm.value.dateAppointment,
        appointmentTime: this.agendamientoForm.value.appointmentTime,
        serviceDuration: this.selectedService.duration
      };
      console.log('Formulario Enviado', cita);
      // Llamar al servicio para crear la cita
      this.AgendamientoService.crearCita(cita).subscribe(
        response => {
          console.log('Cita agendada:', response);
          this.modal.openModal(response.returnStatus.businessMessage);
        },
        error => {
          console.error('Error al agendar cita:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  getDisponibilidad(): void {
    //console.log('Llama disponibilidad');
    const date = this.agendamientoForm.value.dateAppointment;
    const specialistID = this.agendamientoForm.value.specialistID;
    this.especialistaService.getDisponibilidad(specialistID, this.selectedService.duration, date).subscribe(
      response => {
        //console.log('Disponibilidad:', response);
      },
      error => {
        console.error('Error al obtener disponibilidad:', error);
      }
    );
  }

  getEspecialistas(servicioId): void {
    this.selectedService = this.servicios.find(service => service.id == this.agendamientoForm.value.serviceID);
    this.especialistaService.getEspecialistasByIdandService(4, servicioId).subscribe(
      response => {
        //console.log('Especialistas:', response);
        this.especialistas = response;
      }
    );
  }

  onDateChange(date: string): void {
    // Verifica si se seleccionó una fecha válida
    this.isDateSelected = !!date; // Si hay una fecha, habilita el campo "Especialista"
  }

}