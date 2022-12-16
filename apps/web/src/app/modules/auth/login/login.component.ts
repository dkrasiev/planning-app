import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {
    this.authService.user$
      .pipe(filter(Boolean))
      .subscribe(() => this.router.navigate(['']));
  }

  public login() {
    const { username, password } = this.loginForm.value;

    if (username && password)
      this.authService.login$({ username, password }).subscribe();
  }
}
