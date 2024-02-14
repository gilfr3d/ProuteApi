BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(max) NOT NULL,
    [image] NVARCHAR(max),
    [mobile] NVARCHAR(max) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [role] NVARCHAR(1000) CONSTRAINT [Users_role_df] DEFAULT 'Employee',
    [active] BIT NOT NULL CONSTRAINT [Users_active_df] DEFAULT 1,
    CONSTRAINT [pk_users_id] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[RefreshTokens] (
    [id] INT NOT NULL IDENTITY(1,1),
    [token] NVARCHAR(max) NOT NULL,
    [users_id] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [RefreshTokens_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [RefreshTokens_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[RefreshTokens] ADD CONSTRAINT [RefreshTokens_users_id_fkey] FOREIGN KEY ([users_id]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
