-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Service" AS ENUM ('ants', 'termites', 'rodents', 'roaches', 'general');

-- CreateEnum
CREATE TYPE "PestType" AS ENUM ('ants', 'termites', 'rodents', 'roaches', 'general');

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('New', 'Contacted', 'Qualified', 'InspectionScheduled', 'Closed');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "service" "Service" NOT NULL,
    "message" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "preferredTime" TEXT,
    "score" INTEGER NOT NULL,
    "urgency" "Urgency" NOT NULL,
    "pestType" "PestType" NOT NULL,
    "summary" TEXT NOT NULL,
    "recommendedReply" TEXT NOT NULL,
    "nextAction" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomationLog" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AutomationLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AutomationLog" ADD CONSTRAINT "AutomationLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

