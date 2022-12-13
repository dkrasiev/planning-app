import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id',
        component: UserComponent,
      },
    ]),

    TuiButtonModule,
    TuiLinkModule,
  ],
})
export class UsersModule {}
