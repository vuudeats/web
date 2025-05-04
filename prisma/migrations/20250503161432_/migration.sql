/*
  Warnings:

  - You are about to drop the column `ownerEmail` on the `RestaurantRequest` table. All the data in the column will be lost.
  - You are about to drop the column `ownerFirstname` on the `RestaurantRequest` table. All the data in the column will be lost.
  - You are about to drop the column `ownerLastname` on the `RestaurantRequest` table. All the data in the column will be lost.
  - Added the required column `address` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `RestaurantRequest` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `deliveryMethod` on the `RestaurantRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('pickup', 'deliver', 'both');

-- DropIndex
DROP INDEX "RestaurantRequest_ownerEmail_key";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "address" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "RestaurantRequest" DROP COLUMN "ownerEmail",
DROP COLUMN "ownerFirstname",
DROP COLUMN "ownerLastname",
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "deliveryMethod",
ADD COLUMN     "deliveryMethod" "DeliveryMethod" NOT NULL;

-- AddForeignKey
ALTER TABLE "RestaurantRequest" ADD CONSTRAINT "RestaurantRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
