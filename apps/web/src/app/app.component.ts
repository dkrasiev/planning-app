import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './modules/auth/services/auth.service';

interface Route {
  title: string;
  path?: string;
  handler?: Function;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isAuth$: Observable<boolean> = this.authService.user$.pipe(
    map((user) => !!user)
  );

  public routes: Route[] = [
    {
      path: '/applications',
      title: 'Applications',
    },
    {
      path: '/projects',
      title: 'Projects',
    },
    {
      path: '/users',
      title: 'Users',
    },
    {
      path: '/grades',
      title: 'Grades',
    },
    {
      path: '/skills',
      title: 'Skills',
    },
    {
      path: '/departments',
      title: 'Departments',
    },
    {
      title: 'Logout',
      handler: () => this.logout(),
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  public logout() {
    this.authService.logout();

    this.router.navigate(['auth']);
  }
}
