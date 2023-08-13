-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Licor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedUp" DATETIME NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Licor" ("content", "createdAt", "id", "title", "updatedUp") SELECT "content", "createdAt", "id", "title", "updatedUp" FROM "Licor";
DROP TABLE "Licor";
ALTER TABLE "new_Licor" RENAME TO "Licor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
