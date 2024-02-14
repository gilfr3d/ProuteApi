/*
  Warnings:

  - You are about to alter the column `name` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `password` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `image` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `mobile` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to drop the `RefreshTokens` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `role` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[RefreshTokens] DROP CONSTRAINT [RefreshTokens_users_id_fkey];

-- AlterTable
EXEC SP_RENAME N'dbo.pk_users_id', N'Users_pkey';
ALTER TABLE [dbo].[Users] ALTER COLUMN [name] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Users] ALTER COLUMN [password] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Users] ALTER COLUMN [image] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Users] ALTER COLUMN [mobile] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Users] ALTER COLUMN [role] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[RefreshTokens];

-- CreateTable
CREATE TABLE [dbo].[RefreshToken] (
    [id] INT NOT NULL IDENTITY(1,1),
    [token] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [RefreshToken_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [RefreshToken_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [RefreshToken_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Route] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [waypoints] NVARCHAR(1000),
    [distance] FLOAT(53) NOT NULL,
    [schedule] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Route_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Route_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Territory] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [distance] FLOAT(53),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Territory_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Territory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[RefreshToken] ADD CONSTRAINT [RefreshToken_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
