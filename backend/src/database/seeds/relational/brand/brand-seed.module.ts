import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandSeedService } from './brand-seed.service';
import { BrandEntity } from '../../../../brands/infrastructure/persistence/relational/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [BrandSeedService],
  exports: [BrandSeedService],
})
export class BrandSeedModule {}
