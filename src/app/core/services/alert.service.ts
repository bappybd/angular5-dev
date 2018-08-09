import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AlertService {

  alerts = new Alert();
  alerts$ = new BehaviorSubject<any>(this.alerts);

  constructor() { }

  setAlert(message: string, type = 'success') {
    const msgArray = this.alerts;
    if (type === 'success') {
      msgArray.success.push(message);
    }

    this.alerts$.next(msgArray);
  }

  clear() {
    this.alerts$.next(new Alert());
    this.alerts = new Alert();
  }
}

export class Alert {
  errors = [];
  success = [];
  info = [];
  warning = [];
}
