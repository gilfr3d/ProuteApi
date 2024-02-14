/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Territories` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Territories] DROP CONSTRAINT [Territories_address_key];

-- AlterTable
ALTER TABLE [dbo].[Territories] ADD [name] NVARCHAR(1000);

-- CreateIndex
ALTER TABLE [dbo].[Territories] ADD CONSTRAINT [Territories_name_key] UNIQUE NONCLUSTERED ([name]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
