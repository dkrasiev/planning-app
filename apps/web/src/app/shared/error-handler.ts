import { ErrorHandler, Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  constructor(private alertService: TuiAlertService) {}

  handleError(e: any): void {
    console.error(e);

    let message: string = 'Oops... Something goes wrong';

    if (typeof e === 'string') message = e;
    if (typeof e.message === 'string') message = e.message;

    this.alertService
      .open(message, { status: TuiNotification.Error })
      .subscribe();
  }
}
