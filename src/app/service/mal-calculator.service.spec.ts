import { TestBed } from '@angular/core/testing';

import { MalCalculatorService } from './mal-calculator.service';

describe('MalCalculatorService', () => {
  let service: MalCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MalCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
