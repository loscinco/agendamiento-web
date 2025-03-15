import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendamientoModalComponent } from 'src/app/agendamiento-modal/agendamiento-modal.component';
import { EstablecimientoService } from 'src/app/services/establecimiento/establecimiento.service';

@Component({
  selector: 'app-crear-establecimiento',
  templateUrl: './crear-establecimiento.component.html',
  styleUrls: ['./crear-establecimiento.component.css']
})
export class CrearEstablecimientoComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: AgendamientoModalComponent;
  establecimientoForm: FormGroup;

  constructor(private fb: FormBuilder, private establecimientoService: EstablecimientoService) {
    this.establecimientoForm = this.fb.group({
      tipoEstablecimiento: ['', Validators.required],
      rut: ['', [Validators.required, Validators.pattern(/^\d{1,8}-[kK\d]$/)]],
      nombreEstablecimiento: ['', [Validators.required, Validators.minLength(3)]],
      tipoPlan: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.establecimientoForm.valid) {
      // Lógica para enviar el formulario
      //console.log(this.establecimientoForm.value);
      const establecimiento = {
        "name": this.establecimientoForm.value.nombreEstablecimiento,
        "nitRut": this.establecimientoForm.value.rut,
        "address": this.establecimientoForm.value.direccion,
        "city": this.establecimientoForm.value.ciudad,
        "phone": this.establecimientoForm.value.telefono,
        "email": this.establecimientoForm.value.email,
        "status": "A",
        "schedules": {
          "daysOfWeek": "1-5",
          "startTime": "10:00:00",
          "endTime": "20:00:00"
        },
        "establishmentType": this.establecimientoForm.value.tipoEstablecimiento,
        "subscriptionType": this.establecimientoForm.value.tipoPlan
      };
      this.establecimientoService.crearEstablecimiento(establecimiento).subscribe(
        response => {
          //console.log('Establecimiento creado:', response);
          this.modal.openModal(response.message);
        },
        error => {
          console.error('Error al agendar cita:', error);
        }
      );
    }
  }

}
