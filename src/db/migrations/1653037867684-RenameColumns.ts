import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameColumns1653037867684 implements MigrationInterface {
    name = 'RenameColumns1653037867684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_29c593b244774c65824ae1df648"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_5487c160aeb409bc572115553cd"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "boardIdBoardId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD "boardBoardId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_6f876783d0a56d2445b4cb45346" FOREIGN KEY ("boardBoardId") REFERENCES "board"("board_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6f876783d0a56d2445b4cb45346"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "boardBoardId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "boardIdBoardId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_5487c160aeb409bc572115553cd" FOREIGN KEY ("boardIdBoardId") REFERENCES "board"("board_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_29c593b244774c65824ae1df648" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
