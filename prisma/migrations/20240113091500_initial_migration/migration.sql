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
    [role] NVARCHAR(1000) CONSTRAINT [Users_role_df] DEFAULT 'USER',
    CONSTRAINT [pk_users_id] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[RefreshToken] (
    [id] INT NOT NULL IDENTITY(1,1),
    [token] NVARCHAR(max) NOT NULL,
    [users_id] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [RefreshToken_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [RefreshToken_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Permission] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max) NOT NULL,
    [description] NVARCHAR(max),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Permission_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [pk_permissions_id] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Admins] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(max) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(max) NOT NULL,
    [mobile] NVARCHAR(max),
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Admins_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [pk_admins_id] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Admins_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[_UserToPermission] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_UserToPermission_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_AdminToUser] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_AdminToUser_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_AdminToPermission] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_AdminToPermission_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_UserToPermission_B_index] ON [dbo].[_UserToPermission]([B]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_AdminToUser_B_index] ON [dbo].[_AdminToUser]([B]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_AdminToPermission_B_index] ON [dbo].[_AdminToPermission]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[RefreshToken] ADD CONSTRAINT [RefreshToken_users_id_fkey] FOREIGN KEY ([users_id]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_UserToPermission] ADD CONSTRAINT [_UserToPermission_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Permission]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_UserToPermission] ADD CONSTRAINT [_UserToPermission_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_AdminToUser] ADD CONSTRAINT [_AdminToUser_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Admins]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_AdminToUser] ADD CONSTRAINT [_AdminToUser_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_AdminToPermission] ADD CONSTRAINT [_AdminToPermission_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Admins]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_AdminToPermission] ADD CONSTRAINT [_AdminToPermission_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Permission]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
