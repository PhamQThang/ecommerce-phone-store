import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationalPromotionPersistenceModule } from 'src/promotions/infrastructure/persistence/relational/relational-persistence.module';
import { ProductRepository } from '../product.repository';
import { ProductEntity } from './entities/product.entity';
import { ProductRelationalRepository } from './repositories/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    RelationalPromotionPersistenceModule,
  ],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductRelationalRepository,
    },
  ],
  exports: [ProductRepository],
})
export class RelationalProductPersistenceModule {}
