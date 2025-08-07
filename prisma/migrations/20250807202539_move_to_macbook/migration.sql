-- CreateTable
CREATE TABLE "public"."GameSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Scores" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "completionTime" INTEGER NOT NULL,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
);
