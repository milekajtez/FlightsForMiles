﻿using FlightsForMiles.DAL.Contracts.Model;
using FlightsForMiles.DAL.Contracts.Repository;
using FlightsForMiles.DAL.DataModel.friendship;
using FlightsForMiles.DAL.Modal;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlightsForMiles.DAL.Repository
{
    public class FriendshipRepository : IFriendshipRepository
    {
        private readonly UserManager<RegisteredUser> _userManager;
        private readonly ApplicationDbContext _context;
        public FriendshipRepository(UserManager<RegisteredUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        #region 1 - Method for add friendship
        public async Task<Tuple<long, long>> AddFriendship(IFriendship friendship)
        {
            var senderFind = await _userManager.FindByNameAsync(friendship.Sender);
            if (senderFind == null)
            {
                throw new Exception("Sender of request doesn't exsist in database.");
            }

            var receiverFind = await _userManager.FindByNameAsync(friendship.Reciever);
            if (receiverFind == null)
            {
                throw new Exception("Receiver of request doesn't exsist in database.");
            }

            var receiverRole = await _userManager.GetRolesAsync(receiverFind);
            if (!receiverRole[0].Equals("regular_user"))
            {
                throw new Exception("Receiver of request is not regular user.");
            }

            if (senderFind.Id.Equals(receiverFind.Id))
            {
                throw new Exception("You can't send request yourself.");
            }

            var friendships = _context.FriendshipRequests;
            foreach (var fs in friendships)
            {
                if (fs.Sender_pin.ToString().Equals(senderFind.Id) && fs.Reciever_pin.ToString().Equals(receiverFind.Id) ||
                    fs.Sender_pin.ToString().Equals(receiverFind.Id) && fs.Reciever_pin.ToString().Equals(senderFind.Id))
                {
                    throw new Exception("You have this friendship request or you are already friend with user with entered username.");
                }
            }

            FriendshipRequest friendshipRequest = new FriendshipRequest()
            {
                Sender_pin = long.Parse(senderFind.Id),
                Reciever_pin = long.Parse(receiverFind.Id),
                Request_accepted = false
            };

            await _context.FriendshipRequests.AddAsync(friendshipRequest);
            await _context.SaveChangesAsync();

            return new Tuple<long, long>(long.Parse(senderFind.Id), long.Parse(receiverFind.Id));
        }
        #endregion
        #region 2 - Method for load one friendship
        public IFriendship LoadFrinedship(long idSender, long idReceiver)
        {
            var friendships = _context.FriendshipRequests;
            foreach (var fs in friendships)
            {
                if ((fs.Sender_pin.Equals(idSender) && fs.Reciever_pin.Equals(idReceiver)))
                {
                    IFriendship friendship = new FriendshipDataModel()
                    {
                        Sender = fs.Sender_pin.ToString(),
                        Reciever = fs.Reciever_pin.ToString(),
                        RequestAccepted = fs.Request_accepted ? "YES" : "NO"
                    };

                    return friendship;
                }
            }

            throw new Exception("Friendship not found.");
        }
        #endregion
        #region 3 - Method for load my requests
        public async Task<List<IFriendRequest>> LoadRequests(string username, string requestType)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                throw new Exception("Server not found user.");
            }

            var allUsers = _userManager.Users;
            var allRequests = _context.FriendshipRequests;

            List<IFriendRequest> result = new List<IFriendRequest>();

            if (requestType.Equals("fromMe"))
            {
                foreach (var req in allRequests)
                {
                    if (req.Sender_pin.ToString().Equals(user.Id) && !req.Request_accepted)
                    {
                        var maybeFriend = await _userManager.FindByIdAsync(req.Reciever_pin.ToString());
                        result.Add(new FriendRequestDataModel()
                        {
                            Username = maybeFriend.UserName,
                            Firstname = maybeFriend.FirstName,
                            Lastname = maybeFriend.LastName
                        });
                    }
                }

            }
            else
            {
                foreach (var req in allRequests)
                {
                    if (req.Reciever_pin.ToString().Equals(user.Id) && !req.Request_accepted)
                    {
                        var maybeFriend = await _userManager.FindByIdAsync(req.Sender_pin.ToString());
                        result.Add(new FriendRequestDataModel()
                        {
                            Username = maybeFriend.UserName,
                            Firstname = maybeFriend.FirstName,
                            Lastname = maybeFriend.LastName
                        });
                    }
                }

            }


            return result;

        }
        #endregion
        #region 4 - Method for cancel request
        public async Task<bool> CancelRequest(string username, string secondUsername)
        {
            var friendshipRequests = _context.FriendshipRequests;
            var user = await _userManager.FindByNameAsync(username);
            var anotherUser = await _userManager.FindByNameAsync(secondUsername);

            FriendshipRequest friendshipRequest = null;
            foreach (var req in friendshipRequests) 
            {
                if (req.Sender_pin.ToString().Equals(user.Id) && req.Reciever_pin.ToString().Equals(anotherUser.Id)) 
                {
                    friendshipRequest = req;
                }
            }

            if (friendshipRequest == null) 
            {
                return false;
            }

            _context.FriendshipRequests.Remove(friendshipRequest);
            _context.SaveChanges();

            return true;
        }
        #endregion
    }
}
