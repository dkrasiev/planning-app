import { Component, OnInit } from '@angular/core';

import { GradesService } from './grades.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
})
export class GradesComponent implements OnInit {
  public grades$ = this.gradesService.grades$;

  constructor(private gradesService: GradesService) {}

  public ngOnInit() {
    this.update;
  }

  public update() {
    this.gradesService.update();
  }

  public onDelete(id: number) {
    this.gradesService.delete$(id).subscribe(() => this.update());
  }
}
