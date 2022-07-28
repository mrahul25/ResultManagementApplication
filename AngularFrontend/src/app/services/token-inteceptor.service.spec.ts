import { TestBed } from '@angular/core/testing';

import { TokenInteceptorService } from './token-inteceptor.service';

describe('TokenInteceptorService', () => {
  let service: TokenInteceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInteceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
