import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiGroupModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiIslandModule,
  TuiSelectModule,
  TuiTextAreaModule,
  TuiToggleModule,
} from '@taiga-ui/kit';

import { ApplicationsComponent } from './applications.component';
import { ApplicationsService } from '../../services/applications.service';
import { ApplicationComponent } from './application/application.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    TuiButtonModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiGroupModule,
    TuiSelectModule,
    TuiTextAreaModule,
    TuiIslandModule,
  ],
  declarations: [ApplicationsComponent, ApplicationComponent],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
