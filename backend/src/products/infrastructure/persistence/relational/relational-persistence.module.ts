import { Module } from '@nestjs/common';
import { ProductRepository } from '../product.repository';
import { ProductRelationalRepository } from './repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { PromotionRepository } from 'src/promotions/infrastructure/persistence/promotion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, PromotionRepository])],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductRelationalRepository,
    },
  ],
  exports: [ProductRepository],
})
export class RelationalProductPersistenceModule {}
