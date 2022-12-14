import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';

import { Project } from '../project';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent {
  @Output() private create: EventEmitter<Project> = new EventEmitter<Project>();

  public projectForm: FormGroup = new FormGroup({
    shortTitle: new FormControl(''),
    fullTitle: new FormControl(''),
  });

  constructor(
    private projectsService: ProjectsService,
    private alertService: TuiAlertService
  ) {}

  public createProject() {
    const project = this.projectForm.value;

    if (project.shortTitle && project.fullTitle) {
      this.projectsService.create$(project).subscribe((skill) => {
        this.create.emit(skill);
        this.alertService.open('Success!').subscribe();
      });

      this.projectForm.reset();
    } else {
      throw new Error('Please, fill project form!');
    }
  }
}
