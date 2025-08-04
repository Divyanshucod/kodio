-- CreateEnum
CREATE TYPE "public"."Plan" AS ENUM ('FREE', 'PAID');

-- CreateEnum
CREATE TYPE "public"."Provider" AS ENUM ('Google', 'Email');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('Failed', 'Completed', 'Pending', 'InProcess');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "plan" "public"."Plan" NOT NULL DEFAULT 'FREE',
    "password" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "authProvider" "public"."Provider" NOT NULL,
    "verificationToken" TEXT,
    "tokenExpiry" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActive" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Video" (
    "id" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL,
    "videoLink" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "errorMessage" TEXT,
    "prompt" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
