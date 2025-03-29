import { Module } from '@nestjs/common';
import { ProductModelRepository } from '../product-model.repository';
import { ProductModelRelationalRepository } from './repositories/product-model.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModelEntity } from './entities/product-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModelEntity])],
  providers: [
    {
      provide: ProductModelRepository,
      useClass: ProductModelRelationalRepository,
    },
  ],
  exports: [ProductModelRepository],
})
export class RelationalProductModelPersistenceModule {}
