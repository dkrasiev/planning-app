import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiGroupModule } from '@taiga-ui/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('../users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'applications',
    loadChildren: () =>
      import('../applications/applications.module').then(
        (m) => m.ApplicationsModule
      ),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('../projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('../departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'skills',
    loadChildren: () =>
      import('../skills/skills.module').then((m) => m.SkillsModule),
  },
  {
    path: 'grades',
    loadChildren: () =>
      import('../grades/grades.module').then((m) => m.GradesModule),
  },
  {
    path: '**',
    redirectTo: 'applications',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CoreModule {}
