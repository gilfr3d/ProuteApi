/*
  Warnings:

  - Added the required column `mobile_number` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Orders] ADD [mobile_number] NVARCHAR(1000) NOT NULL,
[postal_code] NVARCHAR(1000) NOT NULL,
[state] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
