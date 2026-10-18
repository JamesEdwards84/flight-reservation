import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  // Check if the user is securely logged in
  if (loginService.isLoggedIn()) {
    return true; // Allow access to the route
  } else {
    // Redirect unauthenticated users to the login page
    router.navigate(['/login']); 
    return false; // Block access to the route
  }
};
