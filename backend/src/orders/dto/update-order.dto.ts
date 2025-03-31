// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ProductDto } from 'src/products/dto/product.dto';

export class UpdateOrderDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Type(() => String)
  @IsNotEmpty()
  cartId: string;

  @ApiProperty({
    type: () => [ProductDto],
  })
  @Type(() => ProductDto)
  items?: ProductDto[];

  @ApiProperty({
    type: String,
  })
  @Type(() => String)
  user?: string;

  @ApiProperty({
    type: String,
  })
  @Type(() => String)
  address?: string;
}
