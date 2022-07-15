/*
  Warnings:

  - Made the column `avatar` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `avatar` VARCHAR(191) NOT NULL;
