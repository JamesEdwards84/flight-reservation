import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { LoginService } from './services/login-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  readonly isLoginPage = signal(this.isLoginRoute(this.router.url));

  constructor() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage.set(this.isLoginRoute(event.urlAfterRedirects));
      }
    });
  }

  logout(): void {
    this.loginService.logout();
    void this.router.navigate(['/login']);
  }

  private isLoginRoute(url: string): boolean {
    return url.split(/[?#]/, 1)[0] === '/login';
  }

}
