import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    public user: any;
  constructor(
      private auth: AuthenticationService,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
    this.auth.getProfile()
        .subscribe(response => {
          if(response.user) {
              this.user = response.user;
          } else {
              this.router.navigate(['/user/login']);
          }
        });
  }

}
