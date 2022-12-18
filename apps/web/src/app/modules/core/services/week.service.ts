import { Injectable } from '@angular/core';

import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import * as dayjs from 'dayjs';

dayjs.extend(weekOfYear);

@Injectable({
  providedIn: 'root',
})
export class WeekService {
  public get actualWeekId(): number {
    return dayjs().week();
  }

  constructor() {}
}
