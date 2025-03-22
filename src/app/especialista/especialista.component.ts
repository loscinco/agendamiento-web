import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecialistaService } from '../services/especialista/especialista.service';
import { AgendamientoModalComponent } from '../agendamiento-modal/agendamiento-modal.component';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: AgendamientoModalComponent;
  especialistaForm: FormGroup;

  constructor(private fb: FormBuilder, private especialistaService: EspecialistaService) {
    this.especialistaForm = this.fb.group({
      identification: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required],],
      phone: ['', [Validators.required],],
      establishmentId: ['1'],
      schedules: this.fb.group({
        dayOfWeek: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.especialistaForm.valid) {
      const specialistData = this.especialistaForm.value;
      const specialistScheduleRequest = {
        ...specialistData
      };
      this.especialistaService.crearEspecialista(specialistScheduleRequest).subscribe(
        response => {
          //console.log('Especialista creado:', response);
          this.modal.openModal(response.message, false);
          this.especialistaForm.reset();
        },
        error => {
          console.error('Error al crear especialista:', error);
        }
      );
      //console.log(specialistScheduleRequest);
      // Lógica para enviar el formulario
    }
  }
}