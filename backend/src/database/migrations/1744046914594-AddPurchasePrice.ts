import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPurchasePrice1744046914594 implements MigrationInterface {
  name = 'AddPurchasePrice1744046914594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_identity" ADD "purchasePrice" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_identity" DROP COLUMN "purchasePrice"`,
    );
  }
}
