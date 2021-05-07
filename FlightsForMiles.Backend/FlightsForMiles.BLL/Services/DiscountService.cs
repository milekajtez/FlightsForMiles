using FlightsForMiles.BLL.Contracts.DTO.Discount;
using FlightsForMiles.BLL.Contracts.Services.Discount;
using FlightsForMiles.BLL.Model.Discount;
using FlightsForMiles.BLL.ResponseDTO.Discount;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Services
{
    public class DiscountService : IDiscountService
    {
        private IDiscountRepository _discountRepository;
        public DiscountService(IDiscountRepository discountRepository) 
        {
            _discountRepository = discountRepository;
        }

        #region 1 - Method for load discounts informations
        public IDiscountResponseDTO LoadDiscounts()
        {
            return ConvertDiscountsToResponseObject(_discountRepository.LoadDiscounts().Result);
        }
        #endregion

        #region 2 - Method for update discount
        public void UpdateDiscount(IDiscountRequestDTO discountRequestDTO) 
        {
            if (discountRequestDTO == null)
            {
                throw new ArgumentNullException(nameof(discountRequestDTO));
            }

            _discountRepository.UpdateDiscount(ConvertRequestObjectToDiscountChange(discountRequestDTO));
        }
        #endregion

        #region Converting methods
        private IDiscountResponseDTO ConvertDiscountsToResponseObject(IDiscount discount) 
        {
            return new DiscountResponseDTO() 
            {
                Disc_quick = discount.DiscQuick,
                Disc_300 = discount.Disc300,
                Disc_600 = discount.Disc600,
                Disc_1200 = discount.Disc1200
            };        
        }

        private IDiscountChange ConvertRequestObjectToDiscountChange(IDiscountRequestDTO discountRequestDTO) 
        {
            return new DiscountChange()
            {
                Value = discountRequestDTO.Value,
                Type = discountRequestDTO.Type
            };
        }
        #endregion
    }
}
