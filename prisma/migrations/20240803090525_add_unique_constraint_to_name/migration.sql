-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameInfo" (
    "id" SERIAL NOT NULL,
    "playerName" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "lettersPerSecond" DOUBLE PRECISION NOT NULL,
    "wordsPerMinute" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GameInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");
