import { Module } from '@nestjs/common';
import { ProductIdentityRepository } from '../product-identity.repository';
import { ProductIdentityRelationalRepository } from './repositories/product-identity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductIdentityEntity } from './entities/product-identity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductIdentityEntity])],
  providers: [
    {
      provide: ProductIdentityRepository,
      useClass: ProductIdentityRelationalRepository,
    },
  ],
  exports: [ProductIdentityRepository],
})
export class RelationalProductIdentityPersistenceModule {}
