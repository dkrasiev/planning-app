import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
