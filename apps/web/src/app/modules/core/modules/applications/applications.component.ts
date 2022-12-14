import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Application } from './application';
import { ApplicationsService } from '../../services/applications.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
  public applications$: BehaviorSubject<Application[]> =
    this.applicationsService.applications$;

  constructor(private applicationsService: ApplicationsService) {}

  public update() {
    this.applicationsService.update();
  }
}
