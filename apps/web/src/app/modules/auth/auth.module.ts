import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputModule,
  TuiInputPasswordModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiGroupModule,
} from '@taiga-ui/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    RouterModule.forChild(routes),

    TuiInputModule,
    TuiGroupModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiTabsModule,
    TuiAlertModule,
  ],
})
export class AuthModule {}
