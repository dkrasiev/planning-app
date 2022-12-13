import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiGroupModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [ProjectsComponent, ProjectFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProjectsComponent }]),
    ReactiveFormsModule,

    TuiButtonModule,
    TuiGroupModule,
    TuiInputModule,
    TuiAlertModule,
    TuiSvgModule,
  ],
})
export class ProjectsModule {}
