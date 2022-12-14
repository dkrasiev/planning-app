import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { Department, DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
})
export class DepartmentFormComponent {
  @Output()
  public create = new EventEmitter<Department>();
  public departmentForm = new FormGroup({
    name: new FormControl<string>(''),
  });

  constructor(
    private departmentsService: DepartmentsService,
    private alertService: TuiAlertService
  ) {}

  public onSubmit() {
    const name = this.departmentForm.value.name;

    if (this.departmentForm.valid && name) {
      this.departmentsService.create$(name).subscribe((skill) => {
        this.create.emit(skill);
        this.alertService.open('Success!').subscribe();
      });

      this.departmentForm.reset();
    } else {
      throw new Error('Name is required!');
    }
  }
}
