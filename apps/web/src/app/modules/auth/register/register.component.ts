import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { first, last } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
    email: new FormControl<string>('', [Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: TuiAlertService
  ) {}

  public register() {
    const { username, password, firstName, lastName, email } =
      this.registerForm.value;

    if (
      this.registerForm.valid &&
      username &&
      password &&
      firstName &&
      lastName
    ) {
      this.authService
        .register$({
          username,
          password,
          email: email || undefined,
          firstName,
          lastName,
        })
        .subscribe({
          next: () => this.router.navigate(['../', 'login']),
          error: (e) => {
            this.alertService
              .open(e.error.message, { status: TuiNotification.Error })
              .subscribe();
          },
        });
    }
  }
}
