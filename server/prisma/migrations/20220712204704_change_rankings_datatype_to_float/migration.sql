/*
  Warnings:

  - You are about to alter the column `value` on the `dealers_rankings` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `Float`.
  - You are about to alter the column `value` on the `stores_rankings` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `Float`.

*/
-- AlterTable
ALTER TABLE `dealers_rankings` MODIFY `value` FLOAT NOT NULL;

-- AlterTable
ALTER TABLE `stores_rankings` MODIFY `value` FLOAT NOT NULL;
