import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.component';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsService } from '../../services/applications.service';
import { TuiButtonModule } from '@taiga-ui/core';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
  },
];

@NgModule({
  declarations: [ApplicationsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TuiButtonModule],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
