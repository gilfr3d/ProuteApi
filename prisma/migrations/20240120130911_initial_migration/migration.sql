BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Routes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max) NOT NULL,
    [waypoints] NVARCHAR(max) NOT NULL,
    [distance] FLOAT(53),
    [distanceUnit] NVARCHAR(1000),
    [routeSchedule] NVARCHAR(1000),
    [time] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Routes_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [pk_routes_id] PRIMARY KEY CLUSTERED ([id])
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
