-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_dealerId_fkey`;

-- AlterTable
ALTER TABLE `orders` MODIFY `dealerId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_dealerId_fkey` FOREIGN KEY (`dealerId`) REFERENCES `dealers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
