using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CRUDOperations.Models;
using CRUDOperations.Context;

namespace CRUDOperations.Controllers
{
    public class CustomerController : Controller
    {
        CustomerDataAccessLayer customerDAL = new CustomerDataAccessLayer();

        [HttpGet("[action]")]
        [Route("api/Customer/Index")]
        public IEnumerable<Customer> Index()
        {
            return customerDAL.GetAllCustomers();
        }

        [HttpPost]
        [Route("api/Customer/Create")]
        public int Create([FromBody] Customer customer)
        {
            return customerDAL.AddCustomer(customer);
        }

        [HttpGet]
        [Route("api/Customer/Details/{id}")]
        public Customer Details(int id)
        {
            return customerDAL.GetCustomerData(id);
        }

        [HttpPut]
        [Route("api/Customer/Edit")]
        public int Edit([FromBody]Customer customer)
        {
            return customerDAL.UpdateCustomer(customer);
        }

        [HttpDelete]
        [Route("api/Customer/Delete/{id}")]
        public int Delete(int id)
        {
            return customerDAL.DeleteCustomer(id);
        }
    }
}