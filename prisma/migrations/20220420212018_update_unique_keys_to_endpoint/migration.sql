/*
  Warnings:

  - A unique constraint covering the columns `[projectId,path,method]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Endpoint_projectId_path_key";

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_projectId_path_method_key" ON "Endpoint"("projectId", "path", "method");
