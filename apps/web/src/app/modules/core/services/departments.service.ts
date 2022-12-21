import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Department } from '../modules/departments/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  public departments$: BehaviorSubject<Department[]> = new BehaviorSubject<
    Department[]
  >([]);

  private apiUrl: string = environment.apiUrl + '/departments';

  constructor(private http: HttpClient) {
    this.update();
  }

  public update() {
    this.http
      .get<Department[]>(this.apiUrl)
      .subscribe((departments) => this.departments$.next(departments));
  }

  public delete$(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public create$(name: string) {
    return this.http.post<Department>(this.apiUrl, { name });
  }
}
