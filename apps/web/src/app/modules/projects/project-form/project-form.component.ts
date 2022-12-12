import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Project, ProjectsService } from 'src/app/services/projects.service';

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
      this.projectsService.create$(project).subscribe({
        next: () => {
          this.create.emit(project);
          this.alertService.open(`${project.shortTitle} created!`).subscribe();
        },
        error: () => {
          this.alertService
            .open('Error!', { status: TuiNotification.Error })
            .subscribe();
        },
      });
    } else {
      this.alertService
        .open('Please, fill project form!', {
          status: TuiNotification.Warning,
        })
        .subscribe();
    }
  }
}
