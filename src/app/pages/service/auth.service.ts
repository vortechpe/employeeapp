import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,private cookieService: CookieService) { }

    auth(data:{ username: string; password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/Auth/login`, data,{ withCredentials: true });
    }

    protected(): Observable<any>{
        return this.http.get(`${this.apiUrl}/Auth/protected`, { withCredentials: true });
    }

    logout() : Observable<any>{

        return this.http.post<any>(`${this.apiUrl}/Auth/logout`,null,{withCredentials: true})


    }
}
