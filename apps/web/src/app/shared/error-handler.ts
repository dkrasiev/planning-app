import { ErrorHandler, Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  constructor(private alertService: TuiAlertService) {}

  handleError(error: any): void {
    let message: string = 'Oops... Something goes wrong';

    if (typeof error === 'string') message = error;

    if (typeof error.message === 'string') message = error.message;

    this.alertService
      .open(message, { status: TuiNotification.Error })
      .subscribe();
  }
}
