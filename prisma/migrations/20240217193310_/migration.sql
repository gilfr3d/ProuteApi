/*
  Warnings:

  - You are about to alter the column `order_number` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `BigInt`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Orders] ALTER COLUMN [order_number] BIGINT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
