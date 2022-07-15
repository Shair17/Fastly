-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_couponId_fkey`;

-- AlterTable
ALTER TABLE `products` MODIFY `couponId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
