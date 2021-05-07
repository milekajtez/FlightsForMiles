using FlightsForMiles.BLL.Contracts.DTO.Discount;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.RequestDTO.Discount
{
    public class DiscountRequestDTO : IDiscountRequestDTO
    {
        [Required]
        public string Value { get; set; }

        [Required]
        public string Type { get; set; }
    }
}
