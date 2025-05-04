/*
  Warnings:

  - Changed the type of `deliveryMethod` on the `RestaurantRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RestaurantRequest" DROP COLUMN "deliveryMethod",
ADD COLUMN     "deliveryMethod" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DeliveryMethod";
