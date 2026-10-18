import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, Routes } from '@angular/router';
import { LoginService } from './services/login-service';
import { App } from './app';

@Component({
  standalone: true,
  template: '',
})
class TestPage {}

const testRoutes: Routes = [
  { path: 'login', component: TestPage },
  { path: 'flight', component: TestPage },
];

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideRouter(testRoutes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the username and log out button on authenticated pages', async () => {
    TestBed.inject(LoginService).saveSession('Sohail', 'token');
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(App);
    await router.navigateByUrl('/flight');
    await fixture.whenStable();
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('.session-bar') as HTMLElement;
    expect(header.textContent).toContain('Sohail');
    expect(header.querySelector('button')?.textContent).toContain('Log out');
  });

  it('should hide the session bar on the login page and clear the session on logout', async () => {
    const loginService = TestBed.inject(LoginService);
    const router = TestBed.inject(Router);
    loginService.saveSession('Sohail', 'token');
    const fixture = TestBed.createComponent(App);

    await router.navigateByUrl('/login');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.session-bar')).toBeNull();

    await router.navigateByUrl('/flight');
    await fixture.whenStable();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.logout-button').click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(loginService.isLoggedIn()).toBe(false);
    expect(loginService.getUsername()).toBeNull();
    expect(router.url).toBe('/login');
    expect(fixture.nativeElement.querySelector('.session-bar')).toBeNull();
  });
});
