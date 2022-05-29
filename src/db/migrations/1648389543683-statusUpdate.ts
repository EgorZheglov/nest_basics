import {MigrationInterface, QueryRunner} from "typeorm";

export class statusUpdate1648389543683 implements MigrationInterface {
    name = 'statusUpdate1648389543683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" RENAME COLUMN "columns_a" TO "tasks"`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "tasks" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "tasks" SET DEFAULT 'there gonna be columns'`);
        await queryRunner.query(`ALTER TABLE "board" RENAME COLUMN "tasks" TO "columns_a"`);
    }

}
