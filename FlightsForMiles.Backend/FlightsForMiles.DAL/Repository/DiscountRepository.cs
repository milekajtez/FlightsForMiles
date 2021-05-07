using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.discount;
using FlightsForMiles.DAL.Modal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly ApplicationDbContext _context;
        public DiscountRepository(ApplicationDbContext context) 
        {
            _context = context;
        }

        #region 1 - Method for load discounts
        public async Task<IDiscount> LoadDiscounts()
        {
            Discount discount = await _context.Discounts.FindAsync("discID");
            if (discount == null) 
            {
                throw new KeyNotFoundException("Discounts not found in database.");
            }

            return new DiscountDataModel()
            {
                DiscQuick = discount.Is_quick_reservation.ToString(),
                Disc300 = discount.Points_300.ToString(),
                Disc600 = discount.Points_600.ToString(),
                Disc1200 = discount.Points_1200.ToString()
            };
        }
        #endregion
        #region 2 - Method for update discount
        public async Task UpdateDiscount(IDiscountChange discountChange)
        {
            var currentData = _context.Discounts.FindAsync("discID").Result;
            double newValue = double.Parse(discountChange.Value);
            
            if (discountChange.Type.Equals("quick"))
            {
                currentData.Is_quick_reservation = newValue;
            }
            else if (discountChange.Type.Equals("300"))
            {
                if (newValue >= currentData.Points_600)
                {
                    throw new ArgumentException("Value of 'Percent 300 points' must be smaller than 'Percent 600 points'");
                }

                currentData.Points_300 = newValue;
            }
            else if (discountChange.Type.Equals("600"))
            {
                if (newValue <= currentData.Points_300 || newValue >= currentData.Points_1200)
                {
                    throw new ArgumentException("Value of 'Percent 600 points' must be between 'Percent 300 points' and 'Percent 1200 points'");
                }

                currentData.Points_600 = newValue;
            }
            else if (discountChange.Type.Equals("1200"))
            {
                if (newValue <= currentData.Points_600)
                {
                    throw new ArgumentException("Value of 'Percent 1200 points' must be bigger than 'Percent 600 points'");
                }

                currentData.Points_1200 = newValue;
            }
            else 
            {
                throw new Exception("Unknown error");
            }

            _context.Discounts.Update(currentData);
            _context.SaveChanges();
        }
        #endregion
    }
}
