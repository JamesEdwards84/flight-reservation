import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginService } from '../../services/login-service';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  const loginService = {
    login: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([]), { provide: LoginService, useValue: loginService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display required username and password fields', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input[formControlName="username"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[formControlName="password"]')).toBeTruthy();
    expect(component.loginForm.invalid).toBe(true);
  });

  it('should not submit when required fields are empty', () => {
    component.onSubmit();

    expect(loginService.login).not.toHaveBeenCalled();
    expect(component.loginForm.controls.username.touched).toBe(true);
    expect(component.loginForm.controls.password.touched).toBe(true);
  });
});
