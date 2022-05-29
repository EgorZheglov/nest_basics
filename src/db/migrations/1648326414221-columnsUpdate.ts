import {MigrationInterface, QueryRunner} from "typeorm";

export class columnsUpdate1648326414221 implements MigrationInterface {
    name = 'columnsUpdate1648326414221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "todo"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "inreview"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "done"`);
        await queryRunner.query(`ALTER TABLE "board" ADD "columns_a" character varying NOT NULL DEFAULT 'there gonna be columns'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "columns_a"`);
        await queryRunner.query(`ALTER TABLE "board" ADD "done" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ADD "inreview" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ADD "todo" character varying NOT NULL`);
    }

}
