using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Discount
{
    public interface IDiscountResponseDTO
    {
        public string Disc_quick { get; set; }
        public string Disc_300 { get; set; }
        public string Disc_600 { get; set; }
        public string Disc_1200 { get; set; }
    }
}
