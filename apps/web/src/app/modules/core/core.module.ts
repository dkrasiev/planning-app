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
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), TuiGroupModule],
})
export class CoreModule {}
