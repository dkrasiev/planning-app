import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Department } from '../modules/departments/department';
import { Grade } from '../modules/grades/grade';
import { Skill } from '../modules/skills/skill';
import { User } from '../modules/users/interfaces/user';

export interface UpdatePayload {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  skills: Skill[] | null;
  department: Department | null;
  grade: Grade | null;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  private apiUrl: string = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {
    this.update();
  }

  public update() {
    this.http
      .get<User[]>(this.apiUrl)
      .subscribe((users) => this.users$.next(users));
  }

  public getUser$(username: string) {
    return this.http.get<User>(`${this.apiUrl}/${username}`);
  }

  public update$(
    username: string,
    {
      firstName,
      lastName,
      email,
      skills,
      department,
      grade,
    }: Partial<UpdatePayload>
  ) {
    return this.http.post<User>(`${this.apiUrl}/${username}`, {
      firstName,
      lastName,
      email,
      skills,
      department,
      grade,
    });
  }
}
