import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DepartmentsComponent } from './departments.component';

@NgModule({
  declarations: [DepartmentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DepartmentsComponent }]),
  ],
})
export class DepartmentsModule {}
