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
        Task<bool> ConfirmRegistration(string username);
        Task<object> LoginUser(ILoginUser loginUser);
        object GoogleLoginUser(IGoogleLoginUser googleLoginUser);
        Task<long> AddAvioAdmin(IAvioAdmin newAvioAdmin);
        Task<bool> ChangePass(string pin, string password);
    }
}
