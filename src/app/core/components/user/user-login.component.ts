import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user.component.css']
})
export class UserLoginComponent implements OnInit {

  myForm: FormGroup;
  formErrors: any;
  submitted = false;
  errorMessage = '';

    loading = false;
    returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder,
      private auth: AuthenticationService
  ) {
      this.myForm = formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      });
      this.myForm.valueChanges
          .subscribe(data => this.onValueChanged(data));
  }

    private setFormErrors(errorFields: any): void {
        for (const field_key in errorFields) {
            // skip loop if the property is from prototype
            if (!errorFields.hasOwnProperty(field_key)) {
                continue;
            }

            const message = errorFields[field_key];
            this.formErrors[field_key].valid = false;
            this.formErrors[field_key].message = message;
            console.log(this.formErrors)
        }
    }

    private resetFormErrors():void{
        this.formErrors = {
            username: {valid: true, message: ''},
            password: {valid: true, message: ''},
        };
    }

    public isValid(field): boolean {
        let isValid = false;

        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if (this.myForm.controls[field].touched === false) {
            isValid = true;
        } else if(this.myForm.controls[field].touched === true && this.myForm.controls[field].valid === true) {
            // If the field is touched and valid value, then it is considered as valid.
            isValid = true;
        }
        return isValid;
    }

    public onValueChanged(data?: any) {
        if (!this.myForm) { return; }
        const form = this.myForm;
        if(this.formErrors) {
            for (const field in this.formErrors) {
                // clear previous error message (if any)
                const control = form.get(field);
                if (control && control.dirty) {
                    this.formErrors[field].valid = true;
                    this.formErrors[field].message = '';
                }
            }
        }
    }

  ngOnInit() {
      if (!this.auth.isLoggedIn()) {
          // reset login status
          this.auth.logout();
      } else {
          this.router.navigate(['/']);
      }

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

    public onSubmit(elementValues: any) {
        this.submitted = true;
        this.loading = true;
        this.auth.login(elementValues.username, elementValues.password)
            .subscribe(
                response => {
                    if (response.user) {
                        this.router.navigate([this.returnUrl]);
                    } else {
                        if (response.errors) {
                            this.resetFormErrors();
                            const passwordErrorMessage = response.errors;
                            const errorFields = {
                                username: 'Username error',
                                password: passwordErrorMessage
                            };

                            this.errorMessage = 'There was an error on submission. Please check again.';
                            this.setFormErrors(errorFields);
                        }

                        this.loading = false;
                        this.submitted = false;
                    }
                },
                error => {

                });
    }

}
