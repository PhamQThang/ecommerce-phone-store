import { Module } from '@nestjs/common';
import { CartProductRepository } from '../cart-product.repository';
import { CartProductRelationalRepository } from './repositories/cart-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity])],
  providers: [
    {
      provide: CartProductRepository,
      useClass: CartProductRelationalRepository,
    },
  ],
  exports: [CartProductRepository],
})
export class RelationalCartProductPersistenceModule {}
