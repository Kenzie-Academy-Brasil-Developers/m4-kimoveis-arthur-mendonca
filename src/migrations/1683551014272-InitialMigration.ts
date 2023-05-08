import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1683551014272 implements MigrationInterface {
    name = 'InitialMigration1683551014272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "date" TIMESTAMP NOT NULL`);
    }

}
