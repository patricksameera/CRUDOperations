import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CustomerService } from '../customerservice.service'

@Component({
  selector: 'addcustomer_selector',
  providers: [CustomerService],
  templateUrl: './addcustomer.component.html'
})

export class AddCustomerComponent {
  customerForm: FormGroup;
  title: string = "Create Customer";
  id: number;
  errorMessage: any;
  genderList: string[] = ['Male', 'Female'];

  constructor(private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute,
    private _customerService: CustomerService, private _router: Router) {

    if (this._activatedRoute.snapshot.params["id"]) {
      this.id = this._activatedRoute.snapshot.params["id"];
    }

    this.customerForm = this._formBuilder.group({
      id: 0,
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    if (this.id > 0) {
      debugger;
      this.title = "Edit Customer";
      this._customerService.getCustomerById(this.id)
        .subscribe(resp => this.customerForm.setValue(resp),
          error => this.errorMessage = error);
    }
  }

  save() {
    if (!this.customerForm.valid) {
      return;
    }

    if (this.title == "Create Customer") {
      debugger;
      this._customerService.saveCustomer(this.customerForm.value)
        .subscribe((data) => {
          this._router.navigate(['/getallcustomers']);
        }, error => this.errorMessage = error)
    }
    else if (this.title == "Edit Customer") {
      this._customerService.updateCustomer(this.customerForm.value)
        .subscribe((data) => {
          this._router.navigate(['/getallcustomers']);
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this._router.navigate(['/getallcustomers']);
  }

  get name() { return this.customerForm.get('name'); }
  get country() { return this.customerForm.get('country'); }
  get email() { return this.customerForm.get('email'); }
  get gender() { return this.customerForm.get('gender'); }
 
}
