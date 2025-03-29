import { Module } from '@nestjs/common';
import { BrandRepository } from '../brand.repository';
import { BrandRelationalRepository } from './repositories/brand.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [
    {
      provide: BrandRepository,
      useClass: BrandRelationalRepository,
    },
  ],
  exports: [BrandRepository],
})
export class RelationalBrandPersistenceModule {}
