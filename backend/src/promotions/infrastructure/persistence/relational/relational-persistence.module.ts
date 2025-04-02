import { Module } from '@nestjs/common';
import { PromotionRepository } from '../promotion.repository';
import { PromotionRelationalRepository } from './repositories/promotion.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionEntity } from './entities/promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionEntity])],
  providers: [
    {
      provide: PromotionRepository,
      useClass: PromotionRelationalRepository,
    },
  ],
  exports: [PromotionRepository],
})
export class RelationalPromotionPersistenceModule {}
