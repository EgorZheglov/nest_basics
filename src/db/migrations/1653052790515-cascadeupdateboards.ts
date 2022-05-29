import {MigrationInterface, QueryRunner} from "typeorm";

export class cascadeupdateboards1653052790515 implements MigrationInterface {
    name = 'cascadeupdateboards1653052790515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6f876783d0a56d2445b4cb45346"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_6f876783d0a56d2445b4cb45346" FOREIGN KEY ("boardBoardId") REFERENCES "board"("board_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6f876783d0a56d2445b4cb45346"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_6f876783d0a56d2445b4cb45346" FOREIGN KEY ("boardBoardId") REFERENCES "board"("board_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
