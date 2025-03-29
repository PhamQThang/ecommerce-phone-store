import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorSeedService } from './color-seed.service';
import { ColorEntity } from '../../../../colors/infrastructure/persistence/relational/entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  providers: [ColorSeedService],
  exports: [ColorSeedService],
})
export class ColorSeedModule {}
