import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customerservice.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'getcustomer_selector',
  providers: [CustomerService],
  templateUrl: './getcustomer.component.html'
})

export class GetCustomerComponent {
  title: string = "Customer Data";
  public customerList: CustomerData[];

  constructor(private _customerService: CustomerService) { }

  ngOnInit() {    
    debugger;
    this.getCustomers();
  }

  getCustomers() {
    this._customerService.getCustomers().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.customerList = data;
        console.log("Inspecting customer data:");
        console.log(data);
        return true;
      },
      // the second argument is a function which runs on error
      error => {
        console.log("Error occured:");
        console.error(error);
        return Observable.throw(error);
      },
      // the third argument is a function which runs on completion
      () => console.log('Loading customer data completed sucessfully.')
    );
  }

  delete(customerID) {
    console.log("customerID: " + customerID);
    var ans = confirm("Do you want to delete customer with ID: " + customerID);
    if (ans) {
      this._customerService.deleteCustomer(customerID).subscribe((data) => {
        this.getCustomers();
      }, error => console.error(error))
    }
  }
}

interface CustomerData {
  id: number;
  name: string;  
  country: string;
  email: string;
  gender: string;
}
