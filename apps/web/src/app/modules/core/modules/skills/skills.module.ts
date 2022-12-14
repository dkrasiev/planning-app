import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkillsComponent } from './skills.component';
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core';
import { SkillFormComponent } from './skill-form/skill-form.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SkillsComponent, SkillFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: SkillsComponent }]),

    TuiButtonModule,
    TuiInputModule,
    TuiGroupModule,
  ],
})
export class SkillsModule {}
