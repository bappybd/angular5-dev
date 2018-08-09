import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  alerts: any;
  subAlert: Subscription;

  constructor(public alertService: AlertService) { }

  ngOnInit() {
    this.subAlert = this.alertService.alerts$
      .subscribe(alerts => {
        this.alerts = alerts;

        console.log(this.alerts);
      });

    this.alertService.setAlert('Test Success');
  }
  setAlert(msg) {
    this.alertService.setAlert(msg);
  }


}
