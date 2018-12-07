import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customerservice.service'

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
      data => this.customerList = data
    )
  }

  delete(customerID) {
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
