BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Products] ALTER COLUMN [gtin] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Products] ALTER COLUMN [gln] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
