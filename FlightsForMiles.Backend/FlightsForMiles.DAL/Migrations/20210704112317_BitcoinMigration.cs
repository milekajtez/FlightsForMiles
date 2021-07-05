using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightsForMiles.DAL.Migrations
{
    public partial class BitcoinMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RegisteredUserId",
                table: "Tickets",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Blocks",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Index = table.Column<int>(nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    Proof = table.Column<int>(nullable: false),
                    PreviousHash = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blocks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsersBalance",
                columns: table => new
                {
                    UserID = table.Column<string>(nullable: false),
                    PublicKey = table.Column<string>(nullable: false),
                    Dollars = table.Column<double>(nullable: false),
                    Bitcoins = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersBalance", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Amount = table.Column<double>(nullable: false),
                    RecipientPublicKey = table.Column<string>(nullable: false),
                    SenderPublicKey = table.Column<string>(nullable: false),
                    Signature = table.Column<string>(nullable: false),
                    Fees = table.Column<double>(nullable: false),
                    BlockId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_Blocks_BlockId",
                        column: x => x.BlockId,
                        principalTable: "Blocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_RegisteredUserId",
                table: "Tickets",
                column: "RegisteredUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_BlockId",
                table: "Transactions",
                column: "BlockId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_AspNetUsers_RegisteredUserId",
                table: "Tickets",
                column: "RegisteredUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_AspNetUsers_RegisteredUserId",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "UsersBalance");

            migrationBuilder.DropTable(
                name: "Blocks");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_RegisteredUserId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "RegisteredUserId",
                table: "Tickets");
        }
    }
}
