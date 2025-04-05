import { MigrationInterface, QueryRunner } from 'typeorm';

export class Promotion1743573197856 implements MigrationInterface {
  name = 'Promotion1743573197856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "promotion" ("discount" integer NOT NULL, "description" character varying, "endDate" TIMESTAMP, "startDate" TIMESTAMP, "name" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fab3630e0789a2002f1cadb7d38" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "promotion_product" ("promotionId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_fc6c0c4b0a8da71ef9a0200902d" PRIMARY KEY ("promotionId", "productId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_24753211af0f80fdb5abc45552" ON "promotion_product" ("promotionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_48df77ce600eae1e8966281bb3" ON "promotion_product" ("productId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "promotion_product" ADD CONSTRAINT "FK_24753211af0f80fdb5abc45552f" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotion_product" ADD CONSTRAINT "FK_48df77ce600eae1e8966281bb35" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "promotion_product" DROP CONSTRAINT "FK_48df77ce600eae1e8966281bb35"`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotion_product" DROP CONSTRAINT "FK_24753211af0f80fdb5abc45552f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_48df77ce600eae1e8966281bb3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_24753211af0f80fdb5abc45552"`,
    );
    await queryRunner.query(`DROP TABLE "promotion_product"`);
    await queryRunner.query(`DROP TABLE "promotion"`);
  }
}
