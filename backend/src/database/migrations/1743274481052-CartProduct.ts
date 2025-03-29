import { MigrationInterface, QueryRunner } from 'typeorm';

export class CartProduct1743274481052 implements MigrationInterface {
  name = 'CartProduct1743274481052';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cart_product" ("quantity" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "cartId" uuid NOT NULL, "colorId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "REL_bd554298607a6fad3ae05e0070" UNIQUE ("colorId"), CONSTRAINT "REL_4f1b0c66f4e0b4610e14ca42e5" UNIQUE ("productId"), CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" ADD CONSTRAINT "FK_139f8024067696fe5a8400ebda2" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" ADD CONSTRAINT "FK_bd554298607a6fad3ae05e00706" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" ADD CONSTRAINT "FK_4f1b0c66f4e0b4610e14ca42e5c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_product" DROP CONSTRAINT "FK_4f1b0c66f4e0b4610e14ca42e5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" DROP CONSTRAINT "FK_bd554298607a6fad3ae05e00706"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" DROP CONSTRAINT "FK_139f8024067696fe5a8400ebda2"`,
    );
    await queryRunner.query(`DROP TABLE "cart_product"`);
  }
}
