import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly http = inject(HttpClient);

  login(creds: { username: string; password: string }) {
    return this.http.post<{ token: string }>(environment.authUrl, creds);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if token exists, false otherwise
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  saveSession(username: string, token: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', token);
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
  }

}
