import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, RegisterInfo } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //we put apiUrl in environment folder to prevent Url names changes in multiple places
  apiUrl = environment.apiUrl + 'auth/';
  constructor(private http: HttpClient) {}

  register(credentials: RegisterInfo): Observable<RegisterInfo> {
    return this.http.post<RegisterInfo>(this.apiUrl + 'register', credentials);
  }

  login(credentials: RegisterInfo): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + 'login', credentials);
  }
}
