BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Vehicles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [vehicle_name] NVARCHAR(1000),
    [license_plate] NVARCHAR(1000) NOT NULL,
    [delivery_date] DATETIME2,
    [cargo_type] NVARCHAR(1000),
    [destination_address] NVARCHAR(1000),
    [delivery_status] NVARCHAR(1000),
    [estimated_delivery_time] NVARCHAR(1000),
    [maintenance_required] BIT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Vehicles_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [Vehicles_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Vehicles_license_plate_key] UNIQUE NONCLUSTERED ([license_plate])
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
