import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationRequest, AuthenticationResponse } from '../auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = environment.apiLoginBaseUrl;

  constructor(private http: HttpClient,
    private _router: Router) { }

  public login (authRequest :AuthenticationRequest) : Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiServerUrl}/auth/login`, authRequest);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login'])
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
