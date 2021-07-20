import { TestBed } from '@angular/core/testing';
import { UserPointsService } from './user-points.service';

describe('UserPointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPointsService = TestBed.get(UserPointsService);
    expect(service).toBeTruthy();
  });
});
