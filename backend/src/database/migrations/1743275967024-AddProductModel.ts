import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductModel1743275967024 implements MigrationInterface {
  name = 'AddProductModel1743275967024';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_model" ("code" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "brandId" uuid NOT NULL, CONSTRAINT "UQ_4d172c3819c7939b27e438a6a2f" UNIQUE ("code"), CONSTRAINT "PK_deef06ea1075a8678683d25c718" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "modelId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" ADD CONSTRAINT "FK_58cba7c1d45f761b74d53566c19" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_5a0c91560b6cb1641b516084a97" FOREIGN KEY ("modelId") REFERENCES "product_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_5a0c91560b6cb1641b516084a97"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_model" DROP CONSTRAINT "FK_58cba7c1d45f761b74d53566c19"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "modelId"`);
    await queryRunner.query(`DROP TABLE "product_model"`);
  }
}
