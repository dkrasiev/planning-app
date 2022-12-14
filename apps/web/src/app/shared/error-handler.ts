import { ErrorHandler, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  constructor(private alertService: TuiAlertService) {}

  handleError(error: any): void {
    this.alertService.open(error.toString()).subscribe();
  }
}
