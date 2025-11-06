import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Wait for Firebase to initialize the user state
  return new Promise<boolean>((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        resolve(true); // allow access
      } else {
        router.navigate(['/login']);
        resolve(false); // redirect to login
      }
    });
  });
};
