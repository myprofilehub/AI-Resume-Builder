-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "templateId" TEXT NOT NULL DEFAULT 'modern',
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
