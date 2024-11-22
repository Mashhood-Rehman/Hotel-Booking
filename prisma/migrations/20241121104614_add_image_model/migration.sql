/*
  Warnings:

  - You are about to drop the column `price` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `link` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "price",
DROP COLUMN "status",
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "price",
DROP COLUMN "status",
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT NOT NULL;

-- DropTable
DROP TABLE "Booking";

-- DropEnum
DROP TYPE "BookingStatus";
