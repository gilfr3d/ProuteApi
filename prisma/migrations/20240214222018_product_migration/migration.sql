/*
  Warnings:

  - You are about to alter the column `gtin` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `BigInt`.
  - You are about to alter the column `gln` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `BigInt`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Products] ALTER COLUMN [gtin] BIGINT NOT NULL;
ALTER TABLE [dbo].[Products] ALTER COLUMN [gln] BIGINT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
