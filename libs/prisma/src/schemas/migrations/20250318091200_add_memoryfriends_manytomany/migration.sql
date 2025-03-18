/*
  Warnings:

  - You are about to drop the column `memoryId` on the `friends` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "friends" DROP CONSTRAINT "friends_memoryId_fkey";

-- AlterTable
ALTER TABLE "friends" DROP COLUMN "memoryId";

-- CreateTable
CREATE TABLE "MemoryFriends" (
    "memoryId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "MemoryFriends_pkey" PRIMARY KEY ("memoryId","friendId")
);

-- AddForeignKey
ALTER TABLE "MemoryFriends" ADD CONSTRAINT "MemoryFriends_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "memory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemoryFriends" ADD CONSTRAINT "MemoryFriends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "friends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
