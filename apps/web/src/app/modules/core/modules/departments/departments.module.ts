import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DepartmentsComponent } from './departments.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DepartmentsComponent, DepartmentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: DepartmentsComponent }]),

    TuiButtonModule,
    TuiInputModule,
  ],
})
export class DepartmentsModule {}
