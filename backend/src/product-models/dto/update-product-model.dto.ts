// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateProductModelDto } from './create-product-model.dto';

export class UpdateProductModelDto extends PartialType(CreateProductModelDto) {}
