using FlightsForMiles.DAL.Contracts.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Contracts.Repository
{
    public interface IUserRepository
    {
        Task<long> AddUser(IUser newUser);
        Task<IUser> LoadUser(long id);
        Task<bool> ConfirmRegistratiion(string username);
    }
}
