using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.DTO.Blockchain
{
    public interface IBlockResponseDTO
    {
        public string Index { get; set; }
        public string TimeStamp { get; set; }
        public string Proof { get; set; }
        public string PreviousHash { get; set; }
        public string Hash { get; set; }
    }
}
