import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1645557381999 implements MigrationInterface {
    name = 'Init1645557381999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "slug" varchar NOT NULL, CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "UQ_6fce32ddd71197807027be6ad38" UNIQUE ("slug"))`);
        await queryRunner.query(`CREATE TABLE "response" ("id" varchar PRIMARY KEY NOT NULL, "body" text NOT NULL DEFAULT ('{ "message": "Please update mocks data" }'), "statusCode" integer NOT NULL DEFAULT (500), "endpointId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "header" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "value" varchar NOT NULL, "endpointId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "endpoint" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL, "activeStatusCode" integer NOT NULL DEFAULT (500), "emptyArray" boolean NOT NULL DEFAULT (0), "method" varchar NOT NULL, "forward" boolean NOT NULL DEFAULT (0), "delay" integer NOT NULL DEFAULT (0), "projectId" varchar NOT NULL, "collectionId" varchar)`);
        await queryRunner.query(`CREATE TABLE "collection" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "projectId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_response" ("id" varchar PRIMARY KEY NOT NULL, "body" text NOT NULL DEFAULT ('{ "message": "Please update mocks data" }'), "statusCode" integer NOT NULL DEFAULT (500), "endpointId" varchar NOT NULL, CONSTRAINT "FK_6cf61753d8673839e68d0931675" FOREIGN KEY ("endpointId") REFERENCES "endpoint" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_response"("id", "body", "statusCode", "endpointId") SELECT "id", "body", "statusCode", "endpointId" FROM "response"`);
        await queryRunner.query(`DROP TABLE "response"`);
        await queryRunner.query(`ALTER TABLE "temporary_response" RENAME TO "response"`);
        await queryRunner.query(`CREATE TABLE "temporary_header" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "value" varchar NOT NULL, "endpointId" varchar NOT NULL, CONSTRAINT "FK_c2dddb641f421d0b0687dd97ec2" FOREIGN KEY ("endpointId") REFERENCES "endpoint" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_header"("id", "name", "value", "endpointId") SELECT "id", "name", "value", "endpointId" FROM "header"`);
        await queryRunner.query(`DROP TABLE "header"`);
        await queryRunner.query(`ALTER TABLE "temporary_header" RENAME TO "header"`);
        await queryRunner.query(`CREATE TABLE "temporary_endpoint" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL, "activeStatusCode" integer NOT NULL DEFAULT (500), "emptyArray" boolean NOT NULL DEFAULT (0), "method" varchar NOT NULL, "forward" boolean NOT NULL DEFAULT (0), "delay" integer NOT NULL DEFAULT (0), "projectId" varchar NOT NULL, "collectionId" varchar, CONSTRAINT "FK_97ae63e8e907e39905f6e633d78" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_ae7490dab556dc4810e305099ce" FOREIGN KEY ("collectionId") REFERENCES "collection" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_endpoint"("id", "path", "activeStatusCode", "emptyArray", "method", "forward", "delay", "projectId", "collectionId") SELECT "id", "path", "activeStatusCode", "emptyArray", "method", "forward", "delay", "projectId", "collectionId" FROM "endpoint"`);
        await queryRunner.query(`DROP TABLE "endpoint"`);
        await queryRunner.query(`ALTER TABLE "temporary_endpoint" RENAME TO "endpoint"`);
        await queryRunner.query(`CREATE TABLE "temporary_collection" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "projectId" varchar NOT NULL, CONSTRAINT "FK_fe8a0b33915b84a58aaa0efa885" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_collection"("id", "name", "projectId") SELECT "id", "name", "projectId" FROM "collection"`);
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`ALTER TABLE "temporary_collection" RENAME TO "collection"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" RENAME TO "temporary_collection"`);
        await queryRunner.query(`CREATE TABLE "collection" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "projectId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "collection"("id", "name", "projectId") SELECT "id", "name", "projectId" FROM "temporary_collection"`);
        await queryRunner.query(`DROP TABLE "temporary_collection"`);
        await queryRunner.query(`ALTER TABLE "endpoint" RENAME TO "temporary_endpoint"`);
        await queryRunner.query(`CREATE TABLE "endpoint" ("id" varchar PRIMARY KEY NOT NULL, "path" varchar NOT NULL, "activeStatusCode" integer NOT NULL DEFAULT (500), "emptyArray" boolean NOT NULL DEFAULT (0), "method" varchar NOT NULL, "forward" boolean NOT NULL DEFAULT (0), "delay" integer NOT NULL DEFAULT (0), "projectId" varchar NOT NULL, "collectionId" varchar)`);
        await queryRunner.query(`INSERT INTO "endpoint"("id", "path", "activeStatusCode", "emptyArray", "method", "forward", "delay", "projectId", "collectionId") SELECT "id", "path", "activeStatusCode", "emptyArray", "method", "forward", "delay", "projectId", "collectionId" FROM "temporary_endpoint"`);
        await queryRunner.query(`DROP TABLE "temporary_endpoint"`);
        await queryRunner.query(`ALTER TABLE "header" RENAME TO "temporary_header"`);
        await queryRunner.query(`CREATE TABLE "header" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "value" varchar NOT NULL, "endpointId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "header"("id", "name", "value", "endpointId") SELECT "id", "name", "value", "endpointId" FROM "temporary_header"`);
        await queryRunner.query(`DROP TABLE "temporary_header"`);
        await queryRunner.query(`ALTER TABLE "response" RENAME TO "temporary_response"`);
        await queryRunner.query(`CREATE TABLE "response" ("id" varchar PRIMARY KEY NOT NULL, "body" text NOT NULL DEFAULT ('{ "message": "Please update mocks data" }'), "statusCode" integer NOT NULL DEFAULT (500), "endpointId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "response"("id", "body", "statusCode", "endpointId") SELECT "id", "body", "statusCode", "endpointId" FROM "temporary_response"`);
        await queryRunner.query(`DROP TABLE "temporary_response"`);
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`DROP TABLE "endpoint"`);
        await queryRunner.query(`DROP TABLE "header"`);
        await queryRunner.query(`DROP TABLE "response"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
