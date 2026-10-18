import { TestBed } from '@angular/core/testing';

import { AppHttpClient } from './app-http-client';

describe('AppHttpClient', () => {
  let service: AppHttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppHttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
