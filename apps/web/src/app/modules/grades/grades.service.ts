import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';

export interface Grade {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class GradesService {
  public grades$: BehaviorSubject<Grade[]> = new BehaviorSubject<Grade[]>([]);

  private apiUrl: string = environment.apiUrl + '/grades';

  constructor(private http: HttpClient) {}

  public update() {
    this.http.get<Grade[]>(this.apiUrl);
  }

  public delete$(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public create$(name: string) {
    return this.http.post<Grade>(this.apiUrl, { name });
  }
}
