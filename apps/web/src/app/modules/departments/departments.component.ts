import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Department, DepartmentsService } from './departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  public departments$ = this.departmentsService.departments$;

  constructor(private departmentsService: DepartmentsService) {}

  public ngOnInit() {
    this.update();
  }

  public update() {
    this.departmentsService.update();
  }

  public onDelete(id: number) {
    this.departmentsService.delete$(id).subscribe(() => this.update());
  }
}
