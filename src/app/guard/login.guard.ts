import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.get('https://localhost:7126/api/auth/protected', { withCredentials: true })
        .subscribe({
          next: () => {
            this.router.navigate(['/pages/crud']); // 🟢 Ya autenticado, redirige al CRUD
            resolve(false);
          },
          error: () => {
            resolve(true); // 🔴 Sin token o inválido, permite acceso a login
          }
        });
    });
  }
}
