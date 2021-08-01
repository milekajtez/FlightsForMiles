using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightsForMiles.DAL.Migrations
{
    public partial class BookingBitcoinPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Bookings",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Bookings");
        }
    }
}
