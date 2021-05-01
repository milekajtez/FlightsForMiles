using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightsForMiles.DAL.Migrations
{
    public partial class DifferentAirlineAddressMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Airlines");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Airlines",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "House_number",
                table: "Airlines",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "Airlines",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Airlines");

            migrationBuilder.DropColumn(
                name: "House_number",
                table: "Airlines");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "Airlines");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Airlines",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }
    }
}
