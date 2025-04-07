import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationalPromotionPersistenceModule } from 'src/promotions/infrastructure/persistence/relational/relational-persistence.module';
import { CartRepository } from '../cart.repository';
import { CartEntity } from './entities/cart.entity';
import { CartRelationalRepository } from './repositories/cart.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    RelationalPromotionPersistenceModule,
  ],
  providers: [
    {
      provide: CartRepository,
      useClass: CartRelationalRepository,
    },
  ],
  exports: [CartRepository],
})
export class RelationalCartPersistenceModule {}
