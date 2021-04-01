using FlightsForMiles.BLL.Contracts.DTO.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.BLL.Contracts.Services.User
{
    public interface IUserService
    {
        long AddUser(IUserRequestDTO userRequestDTO);
        IUserResponseDTO LoadUser(long id);
        void ConfirmRegistration(string username);


        /* primeri definisanih metoda
         IEnumerable<IClientResponseDTO> LoadClients();
        IClientResponseDTO LoadClient(Guid id);
        Guid AddClient(IClientRequestDTO newClient);
        bool DeleteClient(Guid id);
        void UpdateClient(IClientRequestDTO currentClient, Guid id);*/
    }
}
