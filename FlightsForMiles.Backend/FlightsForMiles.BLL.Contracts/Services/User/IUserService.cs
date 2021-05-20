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
        object UserLogin(ILoginUserRequestDTO loginUserRequestDTO);
        object UserGoogleLogin(IGoogleLoginUserRequestDTO googleLoginUserRequestDTO);
        long AddAvioAdmin(IAvioAdminRequestDTO avioAdminRequestDTO);
        void ChangePass(string pin, string password);
        IProfileDataResponseDTO LoadUserProfileData(string username);
        void UpdateProfileData(string id, IProfileDataRequestDTO profileDataRequestDTO);
    }
}
