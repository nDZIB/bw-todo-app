import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SESSION_KEY = 'user'
  private baseUrl =`${environment.baseUrl}/api/v1/auth`

  constructor(private http: HttpClient) { }

  logout() {
    localStorage.clear()
    location.reload()
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/sign-in`, data)
  }

  signUp(data: any) {
    return this.http.post(`${this.baseUrl}/sign-up`, data)
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.SESSION_KEY) || '{}')
  }

  persistSession(response: any) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(response))
  }
}
