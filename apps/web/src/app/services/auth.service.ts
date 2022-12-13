import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

export interface LoginRequestBody {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  email?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$ = new BehaviorSubject<User | undefined>(undefined);

  public get token() {
    return localStorage.getItem(environment.ACCESS_TOKEN_KEY);
  }

  private apiUrl: string = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {
    if (this.token) {
      this.refresh$().subscribe();
    }
  }

  public login$(payload: LoginRequestBody) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, payload, {
        withCredentials: true,
      })
      .pipe(
        tap(({ user, token }: LoginResponse) => {
          this.user$.next(user);

          this.saveToken(token);
        })
      );
  }

  public register$(payload: RegisterPayload) {
    return this.http.post<User>(`${this.apiUrl}/register`, payload);
  }

  public refresh$() {
    return this.http
      .get<LoginResponse>(`${this.apiUrl}/refresh`, { withCredentials: true })
      .pipe(
        tap(({ token, user }) => {
          this.saveToken(token);

          this.user$.next(user);
        })
      );
  }

  public logout() {
    this.clearToken();
    this.user$.next(undefined);
  }

  private clearToken() {
    localStorage.removeItem(environment.ACCESS_TOKEN_KEY);
  }

  private saveToken(token: string) {
    localStorage.setItem(environment.ACCESS_TOKEN_KEY, token);
  }
}
