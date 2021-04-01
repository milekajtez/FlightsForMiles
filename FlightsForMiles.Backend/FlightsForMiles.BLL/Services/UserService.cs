using FlightsForMiles.BLL.Contracts.DTO.User;
using FlightsForMiles.BLL.Contracts.Services.User;
using FlightsForMiles.BLL.Model.User;
using FlightsForMiles.BLL.ResponseDTO.User;
using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        #region 1 - Add (User registration)
        public long AddUser(IUserRequestDTO userRequestDTO)
        {
            if (userRequestDTO == null)
            {
                throw new ArgumentNullException(nameof(userRequestDTO));
            }

            IUser user = ConvertRequestObjectToUser(userRequestDTO);
            return _userRepository.AddUser(user).Result;
        }
        #endregion
        #region 2 - Confirm registration
        public void ConfirmRegistration(string username)
        {
            if (!_userRepository.ConfirmRegistratiion(username).Result) 
            {
                throw new Exception("Confirm unsuccessfully becouse user is not found");
            }
        }
        #endregion
        #region 3 - Get (Load one user)
        public IUserResponseDTO LoadUser(long id)
        {
            return ConvertUserToResponseObject(_userRepository.LoadUser(id).Result);
        }
        #endregion

        #region Converting methods
        private IUserResponseDTO ConvertUserToResponseObject(IUser user)
        {
            return new UserResponseDTO()
            {
                Username = user.Username,
                Email = user.Email,
                Password = user.Password,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Pin = user.Pin,
                Address = user.Address,
                Telephone = user.Telephone,
                Passport = user.Passport,
                Points = user.Points.ToString()
            };
        }
        private IUser ConvertRequestObjectToUser(IUserRequestDTO userRequestDTO)
        {
            return new User(userRequestDTO.Username, userRequestDTO.Email, userRequestDTO.Password, userRequestDTO.Firstname,
                userRequestDTO.Lastname, userRequestDTO.Pin, userRequestDTO.Address, userRequestDTO.Telephone, userRequestDTO.Passport,
                0);
        }
        #endregion
    }
}
