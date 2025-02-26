// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperWrapperService } from '../pages/service/jwt-helper.service';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../pages/service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private http: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve) => {
            this.http.protected()
              .subscribe({
                next: () => {
                  resolve(true); // 🟢 Token válido, permite acceso
                },
                error: () => {
                  this.router.navigate(['/auth/access']); // 🔴 Token inválido o ausente, redirige a login
                  resolve(false);
                }
              });
          });
    }

}
