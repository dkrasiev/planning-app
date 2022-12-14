import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Grade } from '../modules/grades/grade';

@Injectable({
  providedIn: 'root',
})
export class GradesService {
  public grades$: BehaviorSubject<Grade[]> = new BehaviorSubject<Grade[]>([]);

  private apiUrl: string = environment.apiUrl + '/grades';

  constructor(private http: HttpClient) {}

  public update() {
    this.http
      .get<Grade[]>(this.apiUrl)
      .subscribe((grades) => this.grades$.next(grades));
  }

  public delete$(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public create$(name: string) {
    return this.http.post<Grade>(this.apiUrl, { name });
  }
}
