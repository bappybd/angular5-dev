import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-products-add',
    templateUrl: 'products-add.component.html'
})
export class ProductsAddComponent implements OnInit, OnDestroy {
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
      public productService: ProductService,
      public alert: AlertService
    ) {
      const pricePattern = '^\\d+\\.\\d{0,2}$'

      this.myForm = formBuilder.group({
        title: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        desc: ['', Validators.required],
        price: ['', Validators.compose([Validators.required, Validators.pattern(pricePattern)])],
        image: []
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
      title: {valid: true, message: ''},
      desc: {valid: true, message: ''},
      price: {valid: true, message: ''}
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

    }

    ngOnDestroy() {

    }

  public onSubmit(formData: any) {
    this.submitted = true;
    this.loading = true;
    this.productService.createProducts(formData)
      .subscribe(
        response => {
          if (response.product) {
            this.router.navigate(['products']);
          } else {
            if (response.errors) {
              console.log(response)
              this.resetFormErrors();
              this.errorMessage = 'There was an error on submission. Please check again.';
              this.setFormErrors(response.errors);
            }

            this.loading = false;
            this.submitted = false;
          }
        },
        error => {

        });
  }
}
