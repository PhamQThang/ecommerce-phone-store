import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { UpdateCartProductDto } from './dto/update-cart-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CartProduct } from './domain/cart-product';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllCartProductsDto } from './dto/find-all-cart-products.dto';

@ApiTags('Cartproducts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'cart-products',
  version: '1',
})
export class CartProductsController {
  constructor(private readonly cartProductsService: CartProductsService) {}

  @Post()
  @ApiCreatedResponse({
    type: CartProduct,
  })
  create(@Body() createCartProductDto: CreateCartProductDto) {
    return this.cartProductsService.create(createCartProductDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(CartProduct),
  })
  async findAll(
    @Query() query: FindAllCartProductsDto,
  ): Promise<InfinityPaginationResponseDto<CartProduct>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.cartProductsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: CartProduct,
  })
  findById(@Param('id') id: string) {
    return this.cartProductsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: CartProduct,
  })
  update(
    @Param('id') id: string,
    @Body() updateCartProductDto: UpdateCartProductDto,
  ) {
    return this.cartProductsService.update(id, updateCartProductDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.cartProductsService.remove(id);
  }
}
