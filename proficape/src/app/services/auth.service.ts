import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = window.location.hostname.includes('github.dev')
      ? `https://${window.location.hostname.replace('-4200.', '-3000.')}/api/auth`
      : 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dados);
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      USU_VAR_EMAIL: email,
      USU_VAR_SENHA: senha
    });
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}