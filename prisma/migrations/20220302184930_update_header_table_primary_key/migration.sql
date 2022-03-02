-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Header" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "endpointId" TEXT NOT NULL,
    CONSTRAINT "Header_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Header" ("endpointId", "id", "name", "value") SELECT "endpointId", "id", "name", "value" FROM "Header";
DROP TABLE "Header";
ALTER TABLE "new_Header" RENAME TO "Header";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
