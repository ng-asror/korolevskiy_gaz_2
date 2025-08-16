import { TestBed } from '@angular/core/testing';

import { Azots } from './azots';

describe('Azots', () => {
  let service: Azots;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Azots);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
