using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Discount
{
    public interface IDiscountRequestDTO
    {
        public string Value { get; set; }
        public string Type { get; set; }
    }
}
