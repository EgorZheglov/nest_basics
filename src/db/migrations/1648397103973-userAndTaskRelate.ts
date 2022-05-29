import {MigrationInterface, QueryRunner} from "typeorm";

export class userAndTaskRelate1648397103973 implements MigrationInterface {
    name = 'userAndTaskRelate1648397103973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" RENAME COLUMN "columns_a" TO "tasks"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "tasks" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "tasks" SET DEFAULT 'there gonna be columns'`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "userId" character varying NOT NULL DEFAULT 'null'`);
        await queryRunner.query(`ALTER TABLE "board" RENAME COLUMN "tasks" TO "columns_a"`);
    }

}
