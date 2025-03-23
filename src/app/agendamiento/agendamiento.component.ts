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
  today: string;
  especialistas: any[] = [];
  servicios: any[] = [];
  selectedService: any;
  isDateSelected: boolean = false;
  horasDisponibles: string[] = [];
  
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
      const nombreEspecialista = this.agendamientoForm.value.specialistID.firstName + ' ' + this.agendamientoForm.value.specialistID.lastName;
      const message = `Hola ${this.agendamientoForm.value.nameClient}, tu cita ha sido agendada exitosamente. 
          Te esperamos el ${this.agendamientoForm.value.dateAppointment} a las ${this.agendamientoForm.value.appointmentTime}.
          con el especialista ${nombreEspecialista}`;
      const cita = {
        nameClient: this.agendamientoForm.value.nameClient,
        email: this.agendamientoForm.value.email,
        phone: this.agendamientoForm.value.phone,
        specialistID: this.agendamientoForm.value.specialistID.id,
        serviceID: this.agendamientoForm.value.serviceID,
        dateAppointment: this.agendamientoForm.value.dateAppointment,
        appointmentTime: this.agendamientoForm.value.appointmentTime,
        serviceDuration: this.selectedService.duration,
        message: message
      };
      //console.log('Formulario Enviado', cita);
      // Llamar al servicio para crear la cita
      this.AgendamientoService.crearCita(cita).subscribe(
        response => {
          //console.log('Cita agendada:', response);
          if(response.returnStatus.status == 'OK'){
            this.modal.openModal(response.returnStatus.businessMessage, false);
          }else{
            this.modal.openModal(response.returnStatus.businessMessage, true, response.data[0], cita);
          }
          this.agendamientoForm.reset();
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
    const specialistID = this.agendamientoForm.value.specialistID.id;
    this.especialistaService.getDisponibilidad(specialistID, this.selectedService.duration, date).subscribe(
      response => {
        console.log('Disponibilidad:', response);
        this.horasDisponibles = response.availability;
        if(this.horasDisponibles == null){
          this.modal.openModal('No hay disponibilidad para la fecha seleccionada', false);
        }
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

  selectHora(hora: string): void {
    this.agendamientoForm.patchValue({ appointmentTime: hora }); // Actualiza el valor del formulario
  }

  onDateChange(date: string): void {
    // Verifica si se seleccionó una fecha válida
    this.isDateSelected = !!date; // Si hay una fecha, habilita el campo "Especialista"
  }

  changeDate(): void {
    this.agendamientoForm.patchValue({
      serviceID: '',
      specialistID: ''
    });
  }


}