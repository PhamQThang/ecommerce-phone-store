import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelateProduct1743519014366 implements MigrationInterface {
  name = 'RelateProduct1743519014366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_identity" DROP CONSTRAINT "FK_01547d49c5f6ceb6bb221501fde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" ALTER COLUMN "supplierId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" ADD CONSTRAINT "FK_01547d49c5f6ceb6bb221501fde" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_identity" DROP CONSTRAINT "FK_01547d49c5f6ceb6bb221501fde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" ALTER COLUMN "supplierId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" ADD CONSTRAINT "FK_01547d49c5f6ceb6bb221501fde" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
