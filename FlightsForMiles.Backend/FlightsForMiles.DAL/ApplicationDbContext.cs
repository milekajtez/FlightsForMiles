using FlightsForMiles.DAL.Modal;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlightsForMiles.DAL
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        // DbSets
        public DbSet<RegisteredUser> RegisteredUsers { get; set; }
        public DbSet<Airline> Airlines { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<FriendshipRequest> FriendshipRequests { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Information> Informations { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Balance> Balances { get; set; }
        public DbSet<Block> Blocks { get; set; }
        public DbSet<Transaction> Transactions { get; set; }


        // Other settings
        protected override void OnModelCreating(ModelBuilder builder) 
        {
            base.OnModelCreating(builder);
            builder.Entity<FriendshipRequest>().HasKey(o => new { o.Sender_pin, o.Reciever_pin });
            builder.Entity<IdentityUserLogin<string>>().HasKey(o => o.UserId);
        }
    }
}
