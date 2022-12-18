import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiGroupModule, TuiLinkModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':username',
        component: UserComponent,
      },
    ]),

    TuiButtonModule,
    TuiLinkModule,
    TuiGroupModule,
    TuiInputModule,
    TuiComboBoxModule,
    TuiMultiSelectModule,
    TuiDataListWrapperModule,
  ],
})
export class UsersModule {}
