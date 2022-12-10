import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: EmployeeComponent }];

@NgModule({
  declarations: [EmployeeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EmployeeModule {}
