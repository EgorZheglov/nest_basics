import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1648246152360 implements MigrationInterface {
    name = 'initial1648246152360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("board_id" SERIAL NOT NULL, "title" character varying NOT NULL, "columns" character varying NOT NULL DEFAULT 'there gonna be columns', CONSTRAINT "PK_bd86e5e77833cf112439f9af37b" PRIMARY KEY ("board_id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("task_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "columnId" character varying NOT NULL DEFAULT 'coming soon', "userId" character varying NOT NULL DEFAULT 'null', "boardId" character varying NOT NULL, "order" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_721f914bb100703f201a77dd58f" PRIMARY KEY ("task_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
