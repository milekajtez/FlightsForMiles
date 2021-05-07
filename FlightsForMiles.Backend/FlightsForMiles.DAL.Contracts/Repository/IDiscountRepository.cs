using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Contracts.Repository
{
    public interface IDiscountRepository
    {
        Task<IDiscount> LoadDiscounts();
        Task UpdateDiscount(IDiscountChange discountChange);
    }
}
