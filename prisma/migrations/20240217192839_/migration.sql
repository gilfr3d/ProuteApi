BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Orders] ALTER COLUMN [order_number] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
