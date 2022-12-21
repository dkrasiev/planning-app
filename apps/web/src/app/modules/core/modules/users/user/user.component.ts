import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';

import { User } from '../interfaces/user';
import { UsersService } from '../../../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Skill } from '../../skills/skill';
import { Department } from '../../departments/department';
import { Grade } from '../../grades/grade';
import { DepartmentsService } from '../../../services/departments.service';
import { GradesService } from '../../../services/grades.service';
import { SkillsService } from '../../../services/skills.service';
import { ApplicationsService } from '../../../services/applications.service';
import { WeekService } from '../../../services/week.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public user?: User;
  public isLoading: boolean = true;
  public isEdit: boolean = false;
  public isSaving: boolean = false;

  public userForm = new FormGroup({
    email: new FormControl<string>(this.user?.email || ''),

    firstName: new FormControl<string>(
      this.user?.firstName || '',
      Validators.required
    ),

    lastName: new FormControl<string>(
      this.user?.lastName || '',
      Validators.required
    ),

    skills: new FormControl<Skill[]>(this.user?.skills || []),

    department: new FormControl<Department | null>(
      this.user?.department || null
    ),

    grade: new FormControl<Grade | null>(this.user?.grade || null),
  });

  public departments$ = this.departmentService.departments$;
  public grades$ = this.gradeService.grades$;
  public skills$ = this.skillService.skills$;

  public get userSkills() {
    return this.user?.skills.map((skill) => skill.name).join(', ') || 'none';
  }

  public get userProjects(): string {
    return (
      this.applicationsService.applications$.value
        .filter(
          (application) => application.weekId === this.weekService.actualWeekId
        )
        .filter(
          (application) => application.employee.username === this.user?.username
        )
        .map((application) => application.project)
        .map((project) => project.shortTitle)
        .join(', ') || 'none'
    );
  }

  public get username(): string {
    return this.route.snapshot.paramMap.get('username') || '';
  }

  constructor(
    private route: ActivatedRoute,
    private alertService: TuiAlertService,

    private usersService: UsersService,
    private departmentService: DepartmentsService,
    private gradeService: GradesService,
    private skillService: SkillsService,
    private applicationsService: ApplicationsService,
    private weekService: WeekService
  ) {}

  ngOnInit(): void {
    this.updateUser();
  }

  public save() {
    this.isSaving = true;

    const value = this.userForm.value;

    if (this.user && this.userForm.valid && value) {
      this.usersService.update$(this.user.username, value).subscribe({
        next: () => {
          this.alertService.open('Saved!').subscribe();

          this.updateUser();
          this.isEdit = false;
          this.isSaving = false;
        },
        error: (e) => {
          this.isSaving = false;

          throw new Error('Failed to save user');
        },
      });
    } else {
      throw new Error('Form is invalid');
    }
  }

  public startEdit() {
    this.resetUserForm();

    this.isEdit = true;
  }

  public cancelEdit() {
    this.isEdit = false;
  }

  public stringify({ name }: { id: number; name: string }): string {
    return name;
  }

  public idMatcher(a: { id: number }, b: { id: number }): boolean {
    return a.id === b.id;
  }

  private resetUserForm() {
    this.userForm.patchValue({
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
      email: this.user?.email,
      department: this.user?.department,
      grade: this.user?.grade,
      skills: this.user?.skills,
    });
  }

  private updateUser() {
    this.usersService.getUser$(this.username).subscribe({
      next: (user) => (this.user = user),
      complete: () => (this.isLoading = false),
    });
  }
}
