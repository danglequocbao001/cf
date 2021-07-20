import { TestBed } from '@angular/core/testing';

import { OrderLocationService } from './order-location.service';

describe('OrderLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderLocationService = TestBed.get(OrderLocationService);
    expect(service).toBeTruthy();
  });
});
