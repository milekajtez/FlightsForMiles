using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightsForMiles.DAL.Migrations
{
    public partial class ChangeBookingChainWithTransactionMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TransactionID",
                table: "Bookings",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransactionID",
                table: "Bookings");
        }
    }
}
