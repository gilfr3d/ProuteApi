BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Products] (
    [id] INT NOT NULL IDENTITY(1,1),
    [product_name] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [order_number] INT NOT NULL,
    [customer_number] INT NOT NULL,
    [gtin] BIGINT NOT NULL,
    [gln] BIGINT NOT NULL,
    [manufacturer] NVARCHAR(1000) NOT NULL,
    [manufactured_date] DATETIME2 NOT NULL,
    [expiry_date] DATETIME2 NOT NULL,
    [country_of_origin] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Products_pkey] PRIMARY KEY CLUSTERED ([id])
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
