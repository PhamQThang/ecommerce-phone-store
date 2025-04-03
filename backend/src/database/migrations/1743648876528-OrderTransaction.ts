import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderTransaction1743648876528 implements MigrationInterface {
  name = 'OrderTransaction1743648876528';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" uuid NOT NULL, CONSTRAINT "PK_d1c3a07f8a0cb7044b57cfe5f35" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_transaction" ADD CONSTRAINT "FK_d94533f12e21b49972ca56fba21" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_transaction" DROP CONSTRAINT "FK_d94533f12e21b49972ca56fba21"`,
    );
    await queryRunner.query(`DROP TABLE "order_transaction"`);
  }
}
