import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class MasterService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAfp(){
        return this.http.get<any>(`${this.apiUrl}/Master/afps`, { withCredentials: true })
    }

    getPosition(){
        return this.http.get<any>(`${this.apiUrl}/Master/positions`, { withCredentials: true })
    }
}
