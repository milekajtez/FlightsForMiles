using FlightsForMiles.BLL.Contracts.DTO.Blockchain;
using FlightsForMiles.BLL.Contracts.Services.Bitcoin;
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
    public class BitcoinsController : ControllerBase
    {
        private readonly IBitcoinService _bitcoinService;
        public BitcoinsController(IBitcoinService bitcoinService) 
        {
            _bitcoinService = bitcoinService;
        }

        #region 1 - Method for creating default block (blockchain)
        [HttpPost]
        [Route("CreateDefaultBlock/{username}")]
        public IActionResult CreateDefaultBlock(string username)
        {
            bool isCreated = _bitcoinService.CreateDefaultBlock(username);
            return isCreated ? Ok(isCreated) : throw new Exception("Creating default blockchain unsuccessfully.");
        }
        #endregion
        #region 2 - Method for delete blockchain
        [HttpDelete]
        [Route("DeleteBlockchain/{username}")]
        public IActionResult DeleteBlockchain(string username) 
        {
            bool isDeleted = _bitcoinService.DeleteBlockchain(username);
            if (isDeleted)
            {
                return NoContent();
            }

            throw new KeyNotFoundException("Deleting unsuccessfully. Blockchain doesn't exsist or operation is currenly invalid.");
        }
        #endregion
        #region 3 - Method for load blockchain
        [HttpGet]
        [Route("LoadBlockchain/{username}")]
        public IActionResult LoadBlockchain(string username) 
        {
            List<IBlockResponseDTO> blockchain = _bitcoinService.LoadBlockchain(username);
            if (blockchain != null)
            {
                return Ok(blockchain);
            }

            return NotFound("Server not found blockchain.");
        }
        #endregion
    }
}
