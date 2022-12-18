import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Application } from './application';
import {
  ApplicationsService,
  NewApplication,
} from '../../services/applications.service';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
  public applications$: BehaviorSubject<Application[]> =
    this.applicationsService.applications$;

  public isCreating: boolean = false;

  constructor(
    private applicationsService: ApplicationsService,
    private alertService: TuiAlertService
  ) {}

  public update() {
    this.applicationsService.update();
  }

  public onCreate(application: NewApplication) {
    this.applicationsService.create$(application).subscribe(() => {
      this.alertService.open('Success!').subscribe();
      this.update();
    });
  }

  public onConfirm(id: number) {
    this.applicationsService.toggle$(id).subscribe((application) => {
      const message = application.confirmed ? 'Confirmed' : 'Undo confirm';

      this.alertService.open(message).subscribe();
      this.update();
    });
  }

  public onDelete(id: number) {
    this.applicationsService.delete$(id).subscribe(() => {
      this.alertService.open('Deleted!').subscribe();
      this.update();
    });
  }

  public showError(message: string) {
    this.alertService
      .open(message, { status: TuiNotification.Error })
      .subscribe();
  }

  public showForm() {
    this.isCreating = true;
  }

  public hideForm() {
    this.isCreating = false;
  }
}
