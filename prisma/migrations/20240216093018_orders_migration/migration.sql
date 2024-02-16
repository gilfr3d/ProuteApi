BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Orders] (
    [id] INT NOT NULL IDENTITY(1,1),
    [order_number] BIGINT NOT NULL,
    [product_name] NVARCHAR(1000) NOT NULL,
    [gtin] NVARCHAR(1000) NOT NULL,
    [gln] NVARCHAR(1000) NOT NULL,
    [customer_name] NVARCHAR(1000) NOT NULL,
    [customer_email] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    [order_date] DATETIME2 NOT NULL,
    [order_total] FLOAT(53) NOT NULL,
    [payment_method] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Orders_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Orders_customer_email_key] UNIQUE NONCLUSTERED ([customer_email])
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
