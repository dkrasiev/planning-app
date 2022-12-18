import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { NewApplication } from '../../../services/applications.service';

import { ProjectsService } from '../../../services/projects.service';
import { UsersService } from '../../../services/users.service';
import { WeekService } from '../../../services/week.service';
import { Project } from '../../projects/project';
import { User } from '../../users/interfaces/user';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent {
  public applicationForm = new FormGroup({
    week: new FormControl<number>(this.currentWeekId, [
      Validators.required,
      Validators.min(1),
      Validators.max(this.currentWeekId),
    ]),

    hours: new FormControl<number>(20, [
      Validators.required,
      Validators.min(10),
      Validators.max(40),
    ]),

    employee: new FormControl<User | null>(null, Validators.required),

    project: new FormControl<Project | null>(null, Validators.required),

    description: new FormControl<string>(''),
  });

  public users$ = this.usersService.users$;
  public projects$ = this.projectService.projects$;

  @Output()
  public create = new EventEmitter<NewApplication>();
  @Output()
  public cancel = new EventEmitter();
  @Output()
  public error = new EventEmitter<string>();

  private get currentWeekId(): number {
    return this.weekService.actualWeekId;
  }

  constructor(
    private usersService: UsersService,
    private projectService: ProjectsService,
    private weekService: WeekService
  ) {}

  public stringifyUser(user: User) {
    return `${user.lastName} ${user.firstName}`;
  }

  public stringifyProject(project: Project) {
    return project.shortTitle;
  }

  public onSubmit() {
    const { week, employee, hours, project, description } =
      this.applicationForm.value;

    if (this.applicationForm.valid && week && hours && employee && project) {
      this.create.emit({
        employee,
        hours,
        project,
        week,
        description: description || '',
      });
      this.applicationForm.reset();
    } else {
      throw new Error('Form is invalid!');
    }
  }

  public onCancel() {
    this.cancel.emit();
  }
}
