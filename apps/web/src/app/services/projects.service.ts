import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Project {
  id: number;
  shortTitle: string;
  fullTitle: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  public projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(
    []
  );

  private apiUrl: string = environment.apiUrl + '/projects';

  constructor(private http: HttpClient) {}

  public getAll$() {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      tap((projects) => {
        this.projects$.next(projects);
      })
    );
  }

  public create$({
    shortTitle,
    fullTitle,
  }: {
    shortTitle: string;
    fullTitle: string;
  }) {
    return this.http.post<Project>(this.apiUrl, { shortTitle, fullTitle });
  }
}
