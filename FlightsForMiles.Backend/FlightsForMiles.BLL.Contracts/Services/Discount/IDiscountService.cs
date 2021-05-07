using FlightsForMiles.BLL.Contracts.DTO.Discount;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.Discount
{
    public interface IDiscountService
    {
        IDiscountResponseDTO LoadDiscounts();
        void UpdateDiscount(IDiscountRequestDTO discountRequestDTO);
    }
}
