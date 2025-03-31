import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserID1743426156915 implements MigrationInterface {
  name = 'UpdateUserID1743426156915';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_2ea6a897ae31205dd30b4008943"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" RENAME COLUMN "userIdId" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" RENAME COLUMN "userId" TO "userIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_2ea6a897ae31205dd30b4008943" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
