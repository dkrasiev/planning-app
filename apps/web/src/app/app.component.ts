import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isAuth$: Observable<boolean> = this.authService.user$.pipe(
    map((user) => !!user)
  );

  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logout();
  }
}
