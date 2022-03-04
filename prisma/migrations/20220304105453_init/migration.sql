-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Collection_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "activeStatusCode" INTEGER NOT NULL DEFAULT 500,
    "emptyArray" BOOLEAN NOT NULL DEFAULT false,
    "method" TEXT NOT NULL,
    "forward" BOOLEAN NOT NULL DEFAULT false,
    "delay" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,
    "collectionId" TEXT,
    CONSTRAINT "Endpoint_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "Endpoint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Header" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "endpointId" TEXT NOT NULL,
    CONSTRAINT "Header_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "configurationId" TEXT,
    CONSTRAINT "Project_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "ProjectConfiguration" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "ProjectConfiguration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ignoreParams" TEXT
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "body" TEXT NOT NULL DEFAULT '{ "message": "Please update mocks data" }',
    "statusCode" INTEGER NOT NULL DEFAULT 500,
    "endpointId" TEXT NOT NULL,
    CONSTRAINT "Response_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_project_3" ON "Project"("name");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_project_2" ON "Project"("slug");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_project_4" ON "Project"("configurationId");
Pragma writable_schema=0;
