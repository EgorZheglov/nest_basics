import {MigrationInterface, QueryRunner} from "typeorm";

export class renameBoardId1642658563264 implements MigrationInterface {
    name = 'renameBoardId1642658563264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" RENAME COLUMN "id" TO "board_id"`);
        await queryRunner.query(`ALTER TABLE "board" RENAME CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" TO "PK_bd86e5e77833cf112439f9af37b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" RENAME CONSTRAINT "PK_bd86e5e77833cf112439f9af37b" TO "PK_865a0f2e22c140d261b1df80eb1"`);
        await queryRunner.query(`ALTER TABLE "board" RENAME COLUMN "board_id" TO "id"`);
    }

}
