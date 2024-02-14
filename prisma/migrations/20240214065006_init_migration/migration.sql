/*
  Warnings:

  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Territory` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[Route];

-- DropTable
DROP TABLE [dbo].[Territory];

-- CreateTable
CREATE TABLE [dbo].[Routes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [waypoints] NVARCHAR(1000),
    [distance] FLOAT(53) NOT NULL,
    [schedule] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Routes_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Routes_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Territories] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [distance] FLOAT(53),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Territories_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Territories_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
