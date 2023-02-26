-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "average" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "title" VARCHAR(255) NOT NULL,
    "detail" VARCHAR(1000) NOT NULL,
    "author" VARCHAR(50) NOT NULL,
    "imgSrc" VARCHAR(100) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "imgSrc" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavRecipe" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "FavRecipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavRecipe" ADD CONSTRAINT "FavRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavRecipe" ADD CONSTRAINT "FavRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
