import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveRelationship1743521212809 implements MigrationInterface {
  name = 'RemoveRelationship1743521212809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_identity" DROP CONSTRAINT "FK_01547d49c5f6ceb6bb221501fde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" RENAME COLUMN "supplierId" TO "purchaseOrderId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" ADD CONSTRAINT "FK_9841e4dff5e251349651d2171fc" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_identity" DROP CONSTRAINT "FK_9841e4dff5e251349651d2171fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" RENAME COLUMN "purchaseOrderId" TO "supplierId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" ADD CONSTRAINT "FK_01547d49c5f6ceb6bb221501fde" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
