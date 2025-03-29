import {
  // common
  Module,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { RelationalBrandPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalBrandPersistenceModule,
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService, RelationalBrandPersistenceModule],
})
export class BrandsModule {}
