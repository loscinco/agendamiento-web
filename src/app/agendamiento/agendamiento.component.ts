import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendamientoServiceService } from '../agendamiento-service.service';
import { AgendamientoModalComponent } from '../agendamiento-modal/agendamiento-modal.component';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.css']
})
export class AgendamientoComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: AgendamientoModalComponent;
  agendamientoForm: FormGroup;
  horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  constructor(private fb: FormBuilder, private AgendamientoService : AgendamientoServiceService) {
    
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
  }

  onSubmit(): void {
    if (this.agendamientoForm.valid) {
      console.log('Formulario Enviado', this.agendamientoForm.value);
      const cita = {
        nameClient: this.agendamientoForm.value.nameClient,
        email: this.agendamientoForm.value.email,
        phone: this.agendamientoForm.value.phone,
        specialistID: this.agendamientoForm.value.specialistID,
        serviceID: this.agendamientoForm.value.serviceID,
        dateAppointment: this.agendamientoForm.value.dateAppointment,
        appointmentTime: this.agendamientoForm.value.appointmentTime
        
      };

      // Llamar al servicio para crear la cita
      this.AgendamientoService.crearCita(cita).subscribe(
        response => {
          console.log('Cita agendada:', response);
          this.modal.openModal();
        },
        error => {
          console.error('Error al agendar cita:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

}