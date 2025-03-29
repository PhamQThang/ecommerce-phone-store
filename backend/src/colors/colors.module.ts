import {
  // common
  Module,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { RelationalColorPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalColorPersistenceModule,
  ],
  controllers: [ColorsController],
  providers: [ColorsService],
  exports: [ColorsService, RelationalColorPersistenceModule],
})
export class ColorsModule {}
