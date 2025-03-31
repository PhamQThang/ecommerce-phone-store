import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserColumn1743429319150 implements MigrationInterface {
  name = 'AddUserColumn1743429319150';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "address" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "address" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
  }
}
