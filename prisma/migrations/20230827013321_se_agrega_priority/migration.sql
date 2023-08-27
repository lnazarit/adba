-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "url" TEXT,
    "cover" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedUp" DATETIME NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "dateDone" DATETIME,
    "dateToDone" DATETIME,
    CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("categoryId", "content", "cover", "createdAt", "dateDone", "dateToDone", "done", "id", "title", "updatedUp", "url") SELECT "categoryId", "content", "cover", "createdAt", "dateDone", "dateToDone", "done", "id", "title", "updatedUp", "url" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
