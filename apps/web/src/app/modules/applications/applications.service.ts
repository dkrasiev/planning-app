import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

export interface Application {
  id: number;
  hours: number;
  weekId: number;
}

export interface NewApplication {
  hours: number;
  weekId: number;
  employeeId: string;
  projectId: number;
}

@Injectable()
export class ApplicationsService {
  public applications$: BehaviorSubject<Application[]> = new BehaviorSubject<
    Application[]
  >([]);

  private apiUrl: string = environment.apiUrl + '/applications';

  constructor(private http: HttpClient, private authService: AuthService) {}

  public update() {
    this.http
      .get<Application[]>(this.apiUrl)
      .subscribe((applications) => this.applications$.next(applications));
  }

  public create$(newApplication: NewApplication) {
    return this.authService.user$.pipe(
      switchMap((user) => {
        const creatorId = user?.id;

        return this.http.post(this.apiUrl, { ...newApplication, creatorId });
      })
    );
  }
}
