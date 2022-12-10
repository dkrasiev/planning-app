import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  email?: string;
}

export interface LoginResponse {
  tokens: { access: string; refresh: string };
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {}

  public login$(body: LoginPayload) {
    return this.http
      .post<LoginResponse>('http://localhost:3001/auth/login', body)
      .pipe(
        tap((response: LoginResponse) => {
          this.user$.next(response.user);
        })
      );
  }

  public register$(body: RegisterPayload) {
    return this.http.post<User>('http://localhost:3001/auth/register', body);
  }
}
