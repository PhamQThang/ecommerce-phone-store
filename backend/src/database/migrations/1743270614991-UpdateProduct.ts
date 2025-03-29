import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProduct1743270614991 implements MigrationInterface {
  name = 'UpdateProduct1743270614991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_identity" ADD "colorId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" ADD CONSTRAINT "UQ_daa2b9c19c7c7e5bbd965e32a4e" UNIQUE ("colorId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "basePrice" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" ADD CONSTRAINT "FK_daa2b9c19c7c7e5bbd965e32a4e" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_identity" DROP CONSTRAINT "FK_daa2b9c19c7c7e5bbd965e32a4e"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "basePrice"`);
    await queryRunner.query(
      `ALTER TABLE "product_identity" DROP CONSTRAINT "UQ_daa2b9c19c7c7e5bbd965e32a4e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_identity" DROP COLUMN "colorId"`,
    );
  }
}
