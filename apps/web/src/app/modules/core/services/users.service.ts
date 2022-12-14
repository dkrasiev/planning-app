import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../modules/users/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  private apiUrl: string = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  public update() {
    this.http
      .get<User[]>(this.apiUrl)
      .subscribe((users) => this.users$.next(users));
  }

  public getUser$(id: string) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
