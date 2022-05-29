import {MigrationInterface, QueryRunner} from "typeorm";

export class orderRemoved1652971498487 implements MigrationInterface {
    name = 'orderRemoved1652971498487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "order" character varying NOT NULL`);
    }

}
