-- CreateTable
CREATE TABLE "RestaurantRequest" (
    "id" SERIAL NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "restaurantName" TEXT NOT NULL,
    "restaurantAddress" TEXT NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "ownerFirstname" TEXT NOT NULL,
    "ownerLastname" TEXT NOT NULL,

    CONSTRAINT "RestaurantRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantRequest_ownerEmail_key" ON "RestaurantRequest"("ownerEmail");
