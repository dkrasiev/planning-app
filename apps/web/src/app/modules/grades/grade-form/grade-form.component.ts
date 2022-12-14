import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';

import { Grade, GradesService } from '../grades.service';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.scss'],
})
export class GradeFormComponent {
  @Output()
  public create: EventEmitter<Grade> = new EventEmitter();

  public gradeForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
  });

  constructor(
    private gradesService: GradesService,
    private alertService: TuiAlertService
  ) {}

  public onSubmit() {
    const name = this.gradeForm.get('name')?.value;

    if (this.gradeForm.valid && name) {
      this.gradesService.create$(name).subscribe((skill) => {
        this.create.emit(skill);
        this.alertService.open('Success!').subscribe();
      });

      this.gradeForm.reset();
    } else {
      throw new Error('Name required!');
    }
  }
}
