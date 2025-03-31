import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderStatus1743431461771 implements MigrationInterface {
  name = 'AddOrderStatus1743431461771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
  }
}
