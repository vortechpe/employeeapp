import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee';

@Injectable({providedIn: 'root'})
export class EmployeeService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getEmployees(searchTerm: string = '', pageNumber: number = 1, pageSize: number = 10): Observable<any> {
        const params = {
          searchTerm: searchTerm || '',
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString()
        };

        return this.http.get(`${this.apiUrl}/Employee`, {
          params: params,
          withCredentials: true
        });
    }

    addEmployee(employee: Employee): Observable<any> {
        employee.documentoNumber= employee.documentoNumber?.toString();
        return this.http.post(`${this.apiUrl}/Employee`, employee,{  withCredentials: true});
    }

    getEmployee(id:number):Observable<any>{
        return this.http.get(`${this.apiUrl}/Employee/${id}`,{withCredentials:true})
    }
    updateEmployee(employee: Employee):Observable<any>{
        employee.documentoNumber= employee.documentoNumber?.toString();
        return this.http.put<any>(`${this.apiUrl}/Employee/${employee.employeeId}`, employee,{  withCredentials: true});
    }
    deleteEmployee(id?:number):Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}/Employee/${id}`, {  withCredentials: true});
    }

}
