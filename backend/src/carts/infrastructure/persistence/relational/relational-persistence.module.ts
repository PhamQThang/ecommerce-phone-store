import { Module } from '@nestjs/common';
import { CartRepository } from '../cart.repository';
import { CartRelationalRepository } from './repositories/cart.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { PromotionRepository } from 'src/promotions/infrastructure/persistence/promotion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, PromotionRepository])],
  providers: [
    {
      provide: CartRepository,
      useClass: CartRelationalRepository,
    },
  ],
  exports: [CartRepository],
})
export class RelationalCartPersistenceModule {}
