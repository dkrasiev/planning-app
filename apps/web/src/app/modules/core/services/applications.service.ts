import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Application } from '../modules/applications/application';

export interface NewApplication {
  hours: number;
  weekId: number;
  employee: string;
  projectId: number;
}

@Injectable({ providedIn: 'root' })
export class ApplicationsService {
  public applications$: BehaviorSubject<Application[]> = new BehaviorSubject<
    Application[]
  >([]);

  private apiUrl: string = environment.apiUrl + '/applications';

  constructor(private http: HttpClient) {}

  public update() {
    this.http
      .get<Application[]>(this.apiUrl)
      .subscribe((applications) => this.applications$.next(applications));
  }

  public create$(newApplication: NewApplication) {
    return this.http.post(this.apiUrl, newApplication);
  }
}
