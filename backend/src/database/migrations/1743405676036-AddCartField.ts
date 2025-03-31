import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCartField1743405676036 implements MigrationInterface {
  name = 'AddCartField1743405676036';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" ADD "status" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "status"`);
  }
}
