import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEspecialistaComponent } from './agenda-especialista.component';

describe('AgendaEspecialistaComponent', () => {
  let component: AgendaEspecialistaComponent;
  let fixture: ComponentFixture<AgendaEspecialistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaEspecialistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
