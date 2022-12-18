import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Application } from '../modules/applications/application';
import { Project } from '../modules/projects/project';
import { User } from '../modules/users/interfaces/user';

export interface NewApplication {
  week: number;
  hours: number;
  project: Project;
  employee: User;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ApplicationsService {
  public applications$: BehaviorSubject<Application[]> = new BehaviorSubject<
    Application[]
  >([]);

  private apiUrl: string = environment.apiUrl + '/applications';

  constructor(private http: HttpClient) {
    this.update();
  }

  public update() {
    this.http
      .get<Application[]>(this.apiUrl)
      .subscribe((applications) => this.applications$.next(applications));
  }

  public toggle$(id: number) {
    return this.http.post<Application>(`${this.apiUrl}/${id}/toggle`, {});
  }

  public confirm$(id: number) {
    return this.http.post<Application>(`${this.apiUrl}/${id}/confirm`, {});
  }

  public cancel$(id: number) {
    return this.http.post<Application>(`${this.apiUrl}/${id}/cancel`, {});
  }

  public delete$(id: number) {
    return this.http.delete<{ result: boolean }>(`${this.apiUrl}/${id}`);
  }

  public create$({ week, hours, employee, project }: NewApplication) {
    return this.http.post(this.apiUrl, {
      week,
      hours,
      employeeUsername: employee.username,
      projectId: project.id,
    });
  }
}
