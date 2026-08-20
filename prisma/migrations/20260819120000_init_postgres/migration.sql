-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Expert" AS ENUM ('SEO', 'GEO', 'GOOGLE_ADS', 'META_ADS', 'CONTENT_STRATEGIST', 'UI_UX', 'CRO');

-- CreateEnum
CREATE TYPE "Package" AS ENUM ('QUICK_CHECK', 'FULL_AUDIT', 'GROWTH_PARTNER');

-- CreateEnum
CREATE TYPE "AuditStatus" AS ENUM ('RUNNING', 'COMPLETE', 'FAILED');

-- CreateEnum
CREATE TYPE "FindingSeverity" AS ENUM ('RED', 'ORANGE', 'YELLOW');

-- CreateEnum
CREATE TYPE "FindingStatus" AS ENUM ('OPEN', 'DONE', 'VERIFIED');

-- CreateEnum
CREATE TYPE "TokenTransactionReason" AS ENUM ('SIGNUP_BONUS', 'TOPUP', 'AUDIT_RUN', 'ORDER_PLACED', 'ORDER_REFUND', 'REFUND');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'DELIVERED');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('SUBMITTED', 'PROPOSAL_READY', 'CONVERTED', 'DECLINED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "businessName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "brandKit" JSONB NOT NULL,
    "icp" JSONB NOT NULL,
    "industry" JSONB NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "researchRaw" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenTransaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "delta" INTEGER NOT NULL,
    "reason" "TokenTransactionReason" NOT NULL,
    "refId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expert" "Expert" NOT NULL,
    "package" "Package" NOT NULL,
    "tokenCost" INTEGER NOT NULL,
    "status" "AuditStatus" NOT NULL DEFAULT 'RUNNING',
    "summary" TEXT,
    "errorMessage" TEXT,
    "rawAgentOutput" JSONB,
    "costUsd" DOUBLE PRECISION,
    "durationMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finding" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "severity" "FindingSeverity" NOT NULL,
    "title" TEXT NOT NULL,
    "whyItCosts" TEXT NOT NULL,
    "impactEstLkr" INTEGER,
    "actionSummary" TEXT NOT NULL,
    "guidedSteps" JSONB NOT NULL,
    "resultIfFixed" TEXT NOT NULL,
    "status" "FindingStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Finding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceSlug" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "tokenCost" INTEGER NOT NULL,
    "deliveryDays" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "deadlineAt" TIMESTAMP(3) NOT NULL,
    "reportPath" TEXT,
    "reportName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),
    "sourceRequestId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceSlug" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "message" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'SUBMITTED',
    "consentToShareAccess" BOOLEAN NOT NULL DEFAULT false,
    "briefPath" TEXT,
    "briefName" TEXT,
    "proposalSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOverride" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT,
    "blurb" TEXT,
    "description" TEXT,
    "applicability" TEXT,
    "icon" TEXT,
    "accessPlatforms" JSONB,
    "requiresWebsite" BOOLEAN,
    "instantCheckout" BOOLEAN,
    "faq" JSONB,
    "packages" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceOverride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposedPackage" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "tokenCost" INTEGER NOT NULL,
    "deliveryDays" INTEGER NOT NULL,
    "features" JSONB NOT NULL,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProposedPackage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProfile_userId_key" ON "BusinessProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_sourceRequestId_key" ON "Order"("sourceRequestId");

-- CreateIndex
CREATE INDEX "Order_userId_serviceSlug_status_idx" ON "Order"("userId", "serviceSlug", "status");

-- CreateIndex
CREATE INDEX "ServiceRequest_userId_serviceSlug_status_idx" ON "ServiceRequest"("userId", "serviceSlug", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOverride_slug_key" ON "ServiceOverride"("slug");

-- AddForeignKey
ALTER TABLE "BusinessProfile" ADD CONSTRAINT "BusinessProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenTransaction" ADD CONSTRAINT "TokenTransaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audit" ADD CONSTRAINT "Audit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finding" ADD CONSTRAINT "Finding_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_sourceRequestId_fkey" FOREIGN KEY ("sourceRequestId") REFERENCES "ServiceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposedPackage" ADD CONSTRAINT "ProposedPackage_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "ServiceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

