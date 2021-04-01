using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightsForMiles.DAL.Migrations
{
    public partial class UserHelpMigration1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AboutSiteInformations",
                columns: table => new
                {
                    Info_ID = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: false),
                    Text = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AboutSiteInformations", x => x.Info_ID);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Question_ID = table.Column<Guid>(nullable: false),
                    Question_text = table.Column<string>(nullable: false),
                    Answer_text = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Question_ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AboutSiteInformations");

            migrationBuilder.DropTable(
                name: "Questions");
        }
    }
}
