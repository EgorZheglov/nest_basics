import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1642658342974 implements MigrationInterface {
    name = 'initial1642658342974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" character varying NOT NULL, "title" character varying NOT NULL, "columns" character varying NOT NULL DEFAULT 'there gonna be columns', CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" character varying NOT NULL, "title" character varying NOT NULL, "columnId" character varying NOT NULL DEFAULT 'coming soon', "userId" character varying NOT NULL DEFAULT 'null', "boardId" character varying NOT NULL, "order" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
