import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-agendamiento-modal',
  templateUrl: './agendamiento-modal.component.html',
  styleUrls: ['./agendamiento-modal.component.css']
})
export class AgendamientoModalComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#citaModal').modal({
      show: false
    });
  }

  openModal() {
    $('#citaModal').modal('show');
  }

  closeModal() {
    $('#citaModal').modal('hide');
  }
}