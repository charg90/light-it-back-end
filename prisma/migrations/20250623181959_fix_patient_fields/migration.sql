/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `documentUrl` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `document_url` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "createdAt",
DROP COLUMN "documentUrl",
DROP COLUMN "fullName",
DROP COLUMN "phoneNumber",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "document_url" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;
