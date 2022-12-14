import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Skill } from '../modules/skills/skill';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  public skills$: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([]);

  private apiUrl: string = environment.apiUrl + '/skills/';

  constructor(private http: HttpClient) {}

  public update() {
    this.http
      .get<Skill[]>(this.apiUrl)
      .subscribe((skills) => this.skills$.next(skills));
  }

  public getSkillById$(id: number) {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  public create$(name: string) {
    return this.http.post<Skill>(this.apiUrl, { name });
  }

  public delete$(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
