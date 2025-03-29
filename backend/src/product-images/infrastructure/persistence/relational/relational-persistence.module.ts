import { Module } from '@nestjs/common';
import { ProductImageRepository } from '../product-image.repository';
import { ProductImageRelationalRepository } from './repositories/product-image.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageEntity } from './entities/product-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImageEntity])],
  providers: [
    {
      provide: ProductImageRepository,
      useClass: ProductImageRelationalRepository,
    },
  ],
  exports: [ProductImageRepository],
})
export class RelationalProductImagePersistenceModule {}
