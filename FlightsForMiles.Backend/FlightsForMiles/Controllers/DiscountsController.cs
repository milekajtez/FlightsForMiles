using FlightsForMiles.BLL.Contracts.DTO.Discount;
using FlightsForMiles.BLL.Contracts.Services.Discount;
using FlightsForMiles.RequestDTO.Discount;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightsForMiles.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountsController : ControllerBase
    {
        private readonly IDiscountService _discountService;
        public DiscountsController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        #region 1 - Get discount informations
        [HttpGet]
        public IActionResult LoadDiscounts() 
        {
            IDiscountResponseDTO dicounts = _discountService.LoadDiscounts();
            if (dicounts != null) 
            {
                return Ok(dicounts);
            }

            return NotFound("Discounts not found");
        }
        #endregion
        #region 2 - Update discount
        [HttpPut]
        public IActionResult UpdateDiscount(DiscountRequestDTO discountRequestDTO) 
        {
            _discountService.UpdateDiscount(discountRequestDTO);
            return NoContent();
        }
        #endregion
    }
}
