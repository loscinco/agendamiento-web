import { TestBed } from '@angular/core/testing';

import { AgendamientoServiceService } from './agendamiento-service.service';

describe('AgendamientoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgendamientoServiceService = TestBed.get(AgendamientoServiceService);
    expect(service).toBeTruthy();
  });
});
