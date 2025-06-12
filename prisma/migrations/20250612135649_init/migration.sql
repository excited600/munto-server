/*
  Warnings:

  - You are about to drop the column `end_date` on the `SocialGathering` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `SocialGathering` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `SocialGathering` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `SocialGathering` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `end_datetime` to the `SocialGathering` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_datetime` to the `SocialGathering` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SocialGathering__start_date__idx";

-- AlterTable
ALTER TABLE "SocialGathering" DROP COLUMN "end_date",
DROP COLUMN "end_time",
DROP COLUMN "start_date",
DROP COLUMN "start_time",
ADD COLUMN     "end_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_datetime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "uuid" DROP DEFAULT,
ALTER COLUMN "uuid" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("uuid");

-- CreateIndex
CREATE INDEX "SocialGathering_start_datetime_idx" ON "SocialGathering"("start_datetime");

-- RenameIndex
ALTER INDEX "user__name__created_at__idx" RENAME TO "User_name_created_at_idx";
