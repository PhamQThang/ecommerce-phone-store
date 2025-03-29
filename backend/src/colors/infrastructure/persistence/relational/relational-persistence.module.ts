import { Module } from '@nestjs/common';
import { ColorRepository } from '../color.repository';
import { ColorRelationalRepository } from './repositories/color.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorEntity } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  providers: [
    {
      provide: ColorRepository,
      useClass: ColorRelationalRepository,
    },
  ],
  exports: [ColorRepository],
})
export class RelationalColorPersistenceModule {}
