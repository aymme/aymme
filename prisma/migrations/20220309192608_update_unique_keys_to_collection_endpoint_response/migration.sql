/*
  Warnings:

  - A unique constraint covering the columns `[projectId,name]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,path]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[endpointId,statusCode]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Collection_projectId_name_key" ON "Collection"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_projectId_path_key" ON "Endpoint"("projectId", "path");

-- CreateIndex
CREATE UNIQUE INDEX "Response_endpointId_statusCode_key" ON "Response"("endpointId", "statusCode");
