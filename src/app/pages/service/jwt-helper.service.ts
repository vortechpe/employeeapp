// src/app/services/jwt-helper.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperWrapperService {
  private jwtHelper = new JwtHelperService();

  isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    return this.jwtHelper.isTokenExpired(token);
  }
}
