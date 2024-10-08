import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// Define your backend API URL
const AUTH_API = 'http://localhost:5001/api';  // Ensure it matches the backend URL

// HTTP options with Content-Type and withCredentials
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true  // Allow sending cookies or authentication tokens
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log('Attempting login with:', email, password);
    return this.http.post(AUTH_API + '/login', {
      email,
      password
    }, httpOptions).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
}


  // Register method
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/signup', {
      username,
      email,
      password
    }, httpOptions);  // Use httpOptions with credentials
  }
}
