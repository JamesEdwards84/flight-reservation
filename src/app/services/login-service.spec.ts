import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { LoginService } from './login-service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and clear the authenticated username and token', () => {
    service.saveSession('Sohail', 'token');

    expect(service.isLoggedIn()).toBe(true);
    expect(service.getUsername()).toBe('Sohail');

    service.logout();

    expect(service.isLoggedIn()).toBe(false);
    expect(service.getUsername()).toBeNull();
  });
});
