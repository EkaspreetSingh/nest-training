-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DATA TYPE "Role",
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "gender" SET DATA TYPE "Gender";
