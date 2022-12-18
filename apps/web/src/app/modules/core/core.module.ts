import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'applications',
    loadChildren: () =>
      import('./modules/applications/applications.module').then(
        (m) => m.ApplicationsModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./modules/projects/projects.module').then(
        (m) => m.ProjectsModule
      ),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./modules/departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'skills',
    loadChildren: () =>
      import('./modules/skills/skills.module').then((m) => m.SkillsModule),
  },
  {
    path: 'grades',
    loadChildren: () =>
      import('./modules/grades/grades.module').then((m) => m.GradesModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'applications',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CoreModule {}
