/*
  Warnings:

  - Added the required column `levelNumber` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Level" ADD COLUMN     "levelNumber" INTEGER NOT NULL;
