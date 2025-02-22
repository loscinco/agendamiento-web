import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamientoModalComponent } from './agendamiento-modal.component';

describe('AgendamientoModalComponent', () => {
  let component: AgendamientoModalComponent;
  let fixture: ComponentFixture<AgendamientoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendamientoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamientoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
