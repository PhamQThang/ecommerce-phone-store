import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveSeriCode1743276391472 implements MigrationInterface {
  name = 'RemoveSeriCode1743276391472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "seriCode"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "seriCode" character varying NOT NULL`,
    );
  }
}
