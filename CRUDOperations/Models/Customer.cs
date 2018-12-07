using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRUDOperations.Models
{
    [Table("tblCustomer")]
    public class Customer
    {
        [Key]
        public int ID { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Country { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        [StringLength(6)]
        public string Gender { get; set; }
    }
}
