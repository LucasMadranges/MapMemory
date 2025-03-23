-- CreateEnum
CREATE TYPE "MemoryType" AS ENUM ('Vacances', 'Sorties', 'Evenements', 'Autres');

-- AlterTable
ALTER TABLE "Friends" ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "Memory" ADD COLUMN     "type" "MemoryType" NOT NULL DEFAULT 'Autres';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "avatar" TEXT;
