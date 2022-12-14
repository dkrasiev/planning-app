import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GradesComponent } from './grades.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [GradesComponent, GradeFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: GradesComponent }]),

    TuiButtonModule,
    TuiInputModule,
  ],
})
export class GradesModule {}
